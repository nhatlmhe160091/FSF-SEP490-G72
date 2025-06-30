import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Button
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import StarIcon from '@mui/icons-material/Star';
import LockIcon from '@mui/icons-material/Lock';
import { toast } from 'react-toastify';
import { useAuth } from '../../contexts/authContext';
import dayjs from 'dayjs';
import BookingDialog from '../../components/dialogs/bookingDialog';
import scheduleService from '../../services/api/scheduleService';
import { formatTimeSchedule } from '../../utils/handleFormat';
import { useParams } from 'react-router-dom';

const BookingSchedule = () => {
  const { typeId } = useParams();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [sportFields, setSportFields] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await scheduleService.getSchedulesByType(typeId, selectedDate.format('YYYY-MM-DD'));
        if (res && res.data) {
          setSportFields(res.data.sportFields || []);
          setTimeSlots(res.data.timeSlots || []);
          setSchedule(res.data.schedules || []);
        }
      } catch (error) {
        toast.error('Không thể tải dữ liệu lịch');
      }
    };
    if (typeId) fetchData();
  }, [typeId, selectedDate]);
useEffect(() => {
  // Reset selectedSlots khi đổi ngày
  setSelectedSlots([]);
}, [selectedDate]);
  const getSlotStatus = (fieldId, slotTime) => {
    const fieldSchedule = schedule.find(s => s.fieldId === fieldId);
    if (!fieldSchedule) return 'available';

    const slotDateTime = new Date(`${selectedDate.format('YYYY-MM-DD')}T${slotTime}:00`);
    for (const slot of fieldSchedule.timeSlots) {
      const start = new Date(slot.startTime);
      const end = new Date(slot.endTime);
      if (slotDateTime >= start && slotDateTime < end) {
        if (slot.status === 'booked') return 'booked';
        if (slot.status === 'maintenance') return 'maintenance';
      }
    }
    return 'available';
  };

  const handleSlotClick = (fieldId, slotTime) => {
  const status = getSlotStatus(fieldId, slotTime);
  if (status !== 'available') {
    toast.warn('Khung giờ này không khả dụng');
    return;
  }

  const slotDateTime = `${selectedDate.toISOString().split('T')[0]}T${slotTime}:00`;

  // Nếu đã chọn slot này rồi thì bỏ chọn, ngược lại thì kiểm tra liên tục rồi thêm vào
  const exists = selectedSlots.find(slot => slot.fieldId === fieldId && slot.time === slotDateTime);
  if (exists) {
    setSelectedSlots(selectedSlots.filter(slot => !(slot.fieldId === fieldId && slot.time === slotDateTime)));
    return;
  }

  // Nếu chưa chọn slot nào, cho phép chọn
  if (selectedSlots.length === 0) {
    setSelectedSlots([{ fieldId, time: slotDateTime }]);
    return;
  }

  // Kiểm tra tất cả slot đã chọn cùng 1 fieldId
  if (selectedSlots.some(slot => slot.fieldId !== fieldId)) {
    toast.warn('Chỉ được chọn các khung giờ liên tục trên cùng một sân');
    return;
  }

  // Lấy danh sách slot đã chọn và slot mới, sắp xếp tăng dần theo thời gian
  const allSlots = [...selectedSlots, { fieldId, time: slotDateTime }]
    .map(slot => slot.time)
    .sort();

  // Kiểm tra các slot có liên tục nhau không (mỗi slot cách nhau đúng 30 phút)
  let isContinuous = true;
  for (let i = 1; i < allSlots.length; i++) {
    const prev = dayjs(allSlots[i - 1]);
    const curr = dayjs(allSlots[i]);
    if (curr.diff(prev, 'minute') !== 30) {
      isContinuous = false;
      break;
    }
  }

  if (!isContinuous) {
    toast.warn('Chỉ được chọn các khung giờ liên tục!');
    return;
  }

  setSelectedSlots([...selectedSlots, { fieldId, time: slotDateTime }]);
};

  const handleBookingSuccess = (bookingData) => {
    setSelectedSlots([]);
  // console.log('Booking successful:', bookingData);
    navigate(`/booking-success/${bookingData._id}`, { state: { bookingData } });
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5' }}>
      <Typography variant="h4" sx={{ mb: 2, color: '#388e3c' }}>
        Đặt lịch ngay trực quan
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Chọn ngày"
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          renderInput={(params) => <TextField {...params} sx={{ mb: 2, width: '200px' }} />}
        />
      </LocalizationProvider>

      <Box sx={{ display: 'flex', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <Box sx={{ width: 20, height: 20, bgcolor: 'white', border: '1px solid #ccc', mr: 1 }} />
          <Typography>Trống</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <Box sx={{ width: 20, height: 20, bgcolor: '#f44336', mr: 1 }} />
          <Typography>Đã đặt</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: 20, height: 20, bgcolor: '#9e9e9e', mr: 1 }} />
          <Typography>Khóa</Typography>
        </Box>
      </Box>

      <Typography sx={{ mb: 2, color: '#f57c00' }}>
        Lưu ý: Nếu bạn cần đặt lịch có định vui lòng liên hệ: 0374.857.068 để được hỗ trợ
      </Typography>

      <Table sx={{ bgcolor: 'white', border: '1px solid #e0e0e0' }}>
        <TableHead>
          <TableRow>
            <TableCell />
            {timeSlots.map((time, index) => (
              <TableCell key={index} sx={{ textAlign: 'center', bgcolor: '#e3f2fd' }}>
                {formatTimeSchedule(time)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sportFields.map(field => (
            <TableRow key={field._id}>
              <TableCell sx={{ fontWeight: 'bold' }}>{field.name.split(' ')[1]}</TableCell>
              {timeSlots.map((time, index) => {
                const status = getSlotStatus(field._id, time);
                const isSelected = selectedSlots.some(
                  slot => slot.fieldId === field._id && slot.time === `${selectedDate.toISOString().split('T')[0]}T${time}:00`
                );
                return (
                  <TableCell
                    key={index}
                    sx={{
                      bgcolor: status === 'booked' ? '#f44336' : status === 'maintenance' ? '#9e9e9e' : isSelected ? '#4caf50' : 'white',
                      textAlign: 'center',
                      cursor: status === 'available' ? 'pointer' : 'default',
                      border: '1px solid #e0e0e0'
                    }}
                    onClick={() => handleSlotClick(field._id, time)}
                  >
                    {status === 'booked' && <StarIcon sx={{ color: 'yellow' }} />}
                    {status === 'maintenance' && <LockIcon sx={{ color: 'white' }} />}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button
        variant="contained"
        sx={{ mt: 2, bgcolor: '#388e3c', '&:hover': { bgcolor: '#2e7d32' } }}
        onClick={() => setOpenBookingDialog(true)}
      >
        Đặt lịch
      </Button>
      <BookingDialog
        open={openBookingDialog}
        onClose={() => setOpenBookingDialog(false)}
        selectedSlots={selectedSlots}
        sportField={
          selectedSlots.length > 0
            ? sportFields.find(f => f._id === selectedSlots[0].fieldId)
            : null
        }
        userId={currentUser?._id}
        onConfirm={handleBookingSuccess}
      />
    </Box>
  );
};

export default BookingSchedule;