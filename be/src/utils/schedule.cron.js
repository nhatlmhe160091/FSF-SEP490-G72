const cron = require('node-cron');
const Schedule = require('../models/schedule.model');
const SportField = require('../models/sportField.model');
const Maintenance = require('../models/maintenance.model');

const TIME_SLOTS = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
    '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'
];

// Helper: tạo timeSlots cho một ngày
function generateTimeSlots(date) {
    const slots = [];
    for (let i = 0; i < TIME_SLOTS.length - 1; i++) {
        const [startHour, startMin] = TIME_SLOTS[i].split(':').map(Number);
        const [endHour, endMin] = TIME_SLOTS[i + 1].split(':').map(Number);
        const startTime = new Date(date);
        startTime.setHours(startHour, startMin, 0, 0);
        const endTime = new Date(date);
        endTime.setHours(endHour, endMin, 0, 0);
        slots.push({ startTime, endTime, status: 'available' });
    }
    return slots;
}

// 1. Tạo lịch mới cho ngày tiếp theo, đồng bộ với Maintenance
async function createNextDaySchedule() {
    try {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const sportFields = await SportField.find();
        for (const field of sportFields) {
            // Kiểm tra đã có schedule chưa
            const existingSchedule = await Schedule.findOne({
                fieldId: field._id,
                date: tomorrow
            });
            if (existingSchedule) {
                console.log(`[Schedule Cron] Đã có lịch cho sân ${field.name} ngày ${tomorrow.toISOString().slice(0, 10)}`);
                continue;
            }

            // Tạo timeSlots
            const timeSlots = generateTimeSlots(tomorrow);

            // Lấy các maintenance cho sân này trong ngày đó
            const maintenances = await Maintenance.find({
                fieldId: field._id,
                startTime: { $lt: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000) },
                endTime: { $gt: tomorrow }
            });

            // Đánh dấu các slot bị maintenance
            for (const maintenance of maintenances) {
                for (const slot of timeSlots) {
                    if (
                        slot.startTime < maintenance.endTime &&
                        slot.endTime > maintenance.startTime
                    ) {
                        slot.status = 'maintenance';
                    }
                }
            }

            await Schedule.create({
                fieldId: field._id,
                date: tomorrow,
                timeSlots
            });

            console.log(`[Schedule Cron] Đã tạo lịch cho sân ${field.name} ngày ${tomorrow.toISOString().slice(0, 10)}`);
        }
    } catch (err) {
        console.error('[Schedule Cron] Lỗi khi tạo lịch mới:', err);
    }
}

// 2. Xóa các schedule cũ (trước ngày hiện tại)
async function cleanupOldSchedules() {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const result = await Schedule.deleteMany({ date: { $lt: today } });
        console.log(`[Schedule Cron] Đã xóa ${result.deletedCount} schedule cũ trước ngày ${today.toISOString().slice(0, 10)}`);
    } catch (err) {
        console.error('[Schedule Cron] Lỗi khi xóa schedule cũ:', err);
    }
}
async function checkAndCreateMissingSchedules(days = 1) {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        for (let i = 1; i <= days; i++) {
            const targetDate = new Date(today);
            targetDate.setDate(today.getDate() + i);

            const sportFields = await SportField.find();
            for (const field of sportFields) {
                const existingSchedule = await Schedule.findOne({
                    fieldId: field._id,
                    date: targetDate
                });
                if (!existingSchedule) {
                    // Tạo timeSlots
                    const timeSlots = generateTimeSlots(targetDate);

                    // Lấy các maintenance cho sân này trong ngày đó
                    const maintenances = await Maintenance.find({
                        fieldId: field._id,
                        startTime: { $lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000) },
                        endTime: { $gt: targetDate }
                    });

                    // Đánh dấu các slot bị maintenance
                    for (const maintenance of maintenances) {
                        for (const slot of timeSlots) {
                            if (
                                slot.startTime < maintenance.endTime &&
                                slot.endTime > maintenance.startTime
                            ) {
                                slot.status = 'maintenance';
                            }
                        }
                    }

                    await Schedule.create({
                        fieldId: field._id,
                        date: targetDate,
                        timeSlots
                    });

                    console.log(`[Schedule Cron] Đã bù lịch cho sân ${field.name} ngày ${targetDate.toISOString().slice(0, 10)}`);
                }
            }
        }
    } catch (err) {
        console.error('[Schedule Cron] Lỗi khi kiểm tra/bù lịch:', err);
    }
}
// 3. Đăng ký cron
function registerScheduleCrons() {

     // Kiểm tra và bù lịch khi server khởi động (bù cho ngày tiếp theo)
    checkAndCreateMissingSchedules(1);

    // Tạo lịch mới mỗi ngày lúc 00:01
    cron.schedule('1 0 * * *', createNextDaySchedule);

    // Xóa lịch cũ mỗi tuần vào thứ Hai lúc 00:01
    cron.schedule('1 0 * * 1', cleanupOldSchedules);

    console.log('[Schedule Cron] Đã đăng ký cron cho Schedule!');
}

module.exports = {
    registerScheduleCrons,
    createNextDaySchedule,
    cleanupOldSchedules,
    generateTimeSlots
};