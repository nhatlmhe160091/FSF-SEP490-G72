import VisibilityIcon from '@mui/icons-material/Visibility';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import React, { useState, useEffect, useContext } from 'react';
import {
    Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, MenuItem, Select, FormControl, InputLabel, Pagination, Divider
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { toast } from 'react-toastify';
import bookingService from '../../../services/api/bookingService';
import { PublicContext } from "../../../contexts/publicContext";
import { walletService } from '../../../services/api/walletService';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useAuth } from "../../../contexts/authContext";
dayjs.extend(utc);
const STATUS_OPTIONS = [
    { value: '', label: 'Tất cả' },
    { value: 'pending', label: 'Đang chờ thanh toán' },
    { value: 'waiting', label: 'Chờ xác nhận' },
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'cancelled', label: 'Đã hủy' }
];

