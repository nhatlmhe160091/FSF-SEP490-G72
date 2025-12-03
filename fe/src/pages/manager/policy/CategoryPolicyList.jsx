import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { categoryPolicyService } from "../../../services/api/categoryPolicyService";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CategoryPolicyList = () => {
    const [categoryPolicies, setCategoryPolicies] = useState([]);
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [title, setTitle] = useState('');

    const fetchCategoryPolicies = async () => {
        const res = await categoryPolicyService.getCategories();
        console.log("res", res);

        if (res?.success) {
            setCategoryPolicies(res.data);
        } else if (Array.isArray(res)) {
            setCategoryPolicies(res);
        } else {
            setCategoryPolicies([]);
        }
    };

    useEffect(() => {
        fetchCategoryPolicies();
    }, []);

    const handleOpen = (item = null) => {
        setEditing(item);
        setTitle(item?.title || '');
        setOpen(true);
    };

    const handleSave = async () => {
        const newTitle = title.trim();

        const isDuplicate = categoryPolicies.some(c =>
            c.title.trim().toLowerCase() === newTitle.toLowerCase() &&
            c._id !== editing?._id
        );

        if (isDuplicate) {
            alert("Tiêu đề đã tồn tại, vui lòng nhập tiêu đề khác!");
            return;
        }

        if (editing) {
            await categoryPolicyService.updateCategory(editing._id, { title: newTitle });
        } else {
            await categoryPolicyService.createCategory({ title: newTitle });
        }

        setOpen(false);
        fetchCategoryPolicies();
    };


    const handleDelete = async (id) => {
        if (window.confirm("Bạn có muốn xóa không?")) {
            await categoryPolicyService.deleteCategory(id);
            fetchCategoryPolicies();
        }
    };

    return (
        <Box p={3}>
            <Typography variant="h4">Danh mục chính sách</Typography>
            <Button variant="contained" color="success" sx={{ mb: 2, borderRadius: 2 }} onClick={() => handleOpen()}>
                + Thêm danh mục
            </Button>
            <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead sx={{ bgcolor: "#e0f2e9" }}>
                        <TableRow>
                            <TableCell>Tên danh mục</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categoryPolicies.map(c => (
                            <TableRow key={c._id}>
                                <TableCell>{c.title}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleOpen(c)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(c._id)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>{editing ? 'Sửa' : 'Thêm'}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label="Tiêu đề"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSave}>Lưu</Button>
                    <Button onClick={() => setOpen(false)}>Hủy</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CategoryPolicyList;