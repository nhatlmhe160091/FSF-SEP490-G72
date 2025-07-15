import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Card, CardContent, Grid, FormControl, InputLabel, Select, MenuItem, Button, TextField
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import bookingService from '../../../services/api/bookingService';

const RevenueDashboard = () => {
    const [fromDate, setFromDate] = useState(dayjs().startOf('month'));
    const [toDate, setToDate] = useState(dayjs().endOf('month'));
    const [groupBy, setGroupBy] = useState('day');
    const [data, setData] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalBookings, setTotalBookings] = useState(0);

    const fetchRevenueData = async () => {
        try {
            const res = await bookingService.getRevenueStatistics({
                from: fromDate.toISOString(),
                to: toDate.toISOString(),
                groupBy
            });
            if (res && res.data) {
                const formattedData = res.data.map(item => ({
                    date: item._id,
                    revenue: item.totalRevenue,
                    bookings: item.totalBookings
                }));
                setData(formattedData);

                // Tổng hợp
                const revenueSum = formattedData.reduce((acc, curr) => acc + curr.revenue, 0);
                const bookingSum = formattedData.reduce((acc, curr) => acc + curr.bookings, 0);
                setTotalRevenue(revenueSum);
                setTotalBookings(bookingSum);
            }
        } catch (error) {
            toast.error('Không thể tải dữ liệu doanh thu');
        }
    };

    useEffect(() => {
        fetchRevenueData();
    }, [fromDate, toDate, groupBy]);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Biểu đồ doanh thu
            </Typography>

            {/* Bộ lọc */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Từ ngày"
                            value={fromDate}
                            onChange={(newValue) => setFromDate(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Đến ngày"
                            value={toDate}
                            onChange={(newValue) => setToDate(newValue)}
                            renderInput={(params) => <TextField {...params} fullWidth />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <FormControl fullWidth>
                        <InputLabel>Nhóm theo</InputLabel>
                        <Select
                            value={groupBy}
                            onChange={(e) => setGroupBy(e.target.value)}
                        >
                            <MenuItem value="day">Ngày</MenuItem>
                            <MenuItem value="month">Tháng</MenuItem>
                            <MenuItem value="year">Năm</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={fetchRevenueData}
                        sx={{ height: '100%' }}
                    >
                        Lọc
                    </Button>
                </Grid>
            </Grid>

            {/* Tổng quan */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ bgcolor: '#1976d2', color: 'white' }}>
                        <CardContent>
                            <Typography variant="h6">Tổng doanh thu</Typography>
                            <Typography variant="h4">
                                {totalRevenue.toLocaleString('vi-VN')} VNĐ
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Card sx={{ bgcolor: '#388e3c', color: 'white' }}>
                        <CardContent>
                            <Typography variant="h6">Tổng số lượt đặt sân</Typography>
                            <Typography variant="h4">
                                {totalBookings}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Biểu đồ */}
            <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#1976d2" name="Doanh thu" />
                        <Line type="monotone" dataKey="bookings" stroke="#388e3c" name="Lượt đặt" />
                    </LineChart>
                </ResponsiveContainer>
            </Box>

            {/* Biểu đồ cột */}
            <Box sx={{ height: 400, mt: 5 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="#1976d2" name="Doanh thu" />
                        <Bar dataKey="bookings" fill="#388e3c" name="Lượt đặt" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default RevenueDashboard;
