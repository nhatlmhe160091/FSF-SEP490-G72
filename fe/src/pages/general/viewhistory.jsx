import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Chip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Divider } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';
import { useAuth } from '../../contexts/authContext';
import matchmakingService from '../../services/api/matchmakingService';

const statusMap = {
    open: { label: 'Đang mở', color: 'info' },
    full: { label: 'Đã đủ', color: 'success' },
    closed: { label: 'Đã đóng', color: 'default' }
};

const MatchmakingHistory = () => {
    const { currentUser } = useAuth();
    const [matchmakings, setMatchmakings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedMatchmaking, setSelectedMatchmaking] = useState(null);

    useEffect(() => {
        const fetchMatchmakings = async () => {
            if (!currentUser?._id) return;
            setLoading(true);
            const res = await matchmakingService.getMatchmakingsByUser(currentUser._id);
            setMatchmakings(res?.data || []);
            setLoading(false);
        };
        fetchMatchmakings();
    }, [currentUser]);

    return (
        <Box sx={{ p: 4, bgcolor: '#f5f5f5' }}>
            <Typography variant="h4" sx={{ mb: 2, color: '#388e3c' }}>
                Lịch sử ghép trận của bạn
            </Typography>
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Sân</TableCell>
                            <TableCell>Thời gian</TableCell>
                            <TableCell>Số người cần thêm</TableCell>
                            <TableCell>Trạng thái</TableCell>
                            <TableCell>Chi tiết</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">Đang tải...</TableCell>
                            </TableRow>
                        ) : matchmakings.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">Bạn chưa có lịch sử ghép trận nào</TableCell>
                            </TableRow>
                        ) : (
                            matchmakings.map(m => (
                                <TableRow key={m._id}>
                                    <TableCell>{m.bookingId?.fieldId?.name}</TableCell>
                                    <TableCell>
                                        {m.bookingId?.startTime && m.bookingId?.endTime
                                            ? `${dayjs(m.bookingId.startTime).format('HH:mm DD/MM/YYYY')} - ${dayjs(m.bookingId.endTime).format('HH:mm DD/MM/YYYY')}`
                                            : ''}
                                    </TableCell>
                                    <TableCell>{m.requiredPlayers}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={statusMap[m.status]?.label || m.status}
                                            color={statusMap[m.status]?.color || 'default'}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton color="primary" onClick={() => setSelectedMatchmaking(m)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Paper>

            {/* Dialog chi tiết ghép trận */}

        </Box>
    );
};

export default MatchmakingHistory;