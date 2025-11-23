import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";

const CONSUMABLE_TYPES = [
  { value: "water", label: "Nước" },
  { value: "snack", label: "Snack" },
  { value: "meal", label: "Bữa ăn" },
  { value: "beverage", label: "Đồ uống" },
];

const STATUS_OPTIONS = [
  { value: "available", label: "Còn hàng" },
  { value: "out_of_stock", label: "Hết hàng" },
];

const ConsumableFormModal = ({ isOpen, onClose, onSubmit, initialData, sportFields }) => {
  const [form, setForm] = useState({
    name: "",
    type: "water",
    pricePerUnit: 0,
    quantityInStock: 0,
    status: "available",
    sportField: [],
  });

  useEffect(() => {
    setForm(prev => ({
      ...(initialData || {}),
      name: initialData?.name || "",
      type: initialData?.type || "water",
      pricePerUnit: initialData?.pricePerUnit || 0,
      quantityInStock: initialData?.quantityInStock || 0,
      status: initialData?.status || "available",
      sportField: sportFields.map(f => f._id), // Luôn tự động chọn tất cả sân
    }));
  }, [initialData, sportFields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFieldChange = (event, value) => {
    setForm((prev) => ({ ...prev, sportField: value.map(f => f._id || f) }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.type || form.sportField.length === 0) {
      toast.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    onSubmit(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? "Cập nhật vật tư tiêu hao" : "Thêm vật tư tiêu hao"}</DialogTitle>
      <DialogContent>
        <TextField
          className="input"
          name="name"
          value={form.name}
          onChange={handleChange}
          label="Tên vật tư"
          fullWidth
          margin="normal"
        />
        <TextField
          select
          className="input"
          name="type"
          value={form.type}
          onChange={handleChange}
          label="Loại vật tư"
          fullWidth
          margin="normal"
        >
          {CONSUMABLE_TYPES.map(option => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </TextField>
        <TextField
          className="input"
          name="pricePerUnit"
          type="number"
  