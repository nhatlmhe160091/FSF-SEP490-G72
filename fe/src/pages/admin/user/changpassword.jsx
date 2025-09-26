import React, { useState, useEffect } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
    Pagination, TextField, Select, MenuItem, FormControl, InputLabel, Button, Dialog,
    DialogTitle, DialogContent, Grid, Box
} from '@mui/material';
import UserService from '../../../services/userService';
import { formatDate } from '../../../utils/handleFormat';
import UpdateUser from './UpdateUser';
import RegisterUser from './RegisterUser';
const roleMapping = {
    ADMIN: 'Quản trị viên',
    MANAGER: 'Quản lí viên',
    CUSTOMER: 'Khách hàng',
};
const getRoleInVietnamese = (role) => roleMapping[role] || 'Không xác định';
const UserList1 = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [search, setSearch] = useState('');
    const [role, setRole] = useState('');
    const [totalPages, setTotalPages] = useState(1);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [openRegisterDialog, setOpenRegisterDialog] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await UserService.getPaginatedUsers(page, limit, search, role);
            setUsers(data.data);
            setTotalPages(data.meta.totalPages);
        };
        fetchUsers();
    }, [page, limit, search, role]);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setOpenEditDialog(true);
    };



    return (
        <div>
<Grid container alignItems="center" spacing={2}>
    <Grid item xs={12} md={8}>
        <Box display="flex" gap={2}>
            <TextField
                label="Tìm kiếm"
                placeholder="Nhập từ thông tin tìm kiếm..."
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Vai trò</InputLabel>
                <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                   
                </Select>
            </FormControl>
        </Box>
    </Grid>
    <Grid item xs={12} md={4} textAlign={{ xs: 'center', md: 'right' }}>
        <Button
            variant="contained"
            color="primary"
            onClick={handleOpenRegisterDialog}
        >
            Tạo tài khoản
        </Button>
    </Grid>
</Grid>

            <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                         
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                           
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
            />

            {/* Dialog for UpdateUser form */ }
    <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Chỉnh sửa tài khoản</DialogTitle>
        <DialogContent>
            {selectedUser && (
                <UpdateUser user={selectedUser} onClose={handleCloseEditDialog} />
            )}
        </DialogContent>
    </Dialog>

    {/* Dialog for RegisterUser form */ }
    <Dialog open={openRegisterDialog} onClose={handleCloseRegisterDialog}>
        <DialogTitle>Tạo tài khoản mới</DialogTitle>
        <DialogContent>
            <RegisterUser />
        </DialogContent>
    </Dialog>
        </div >
    );
};

export default UserList1;
