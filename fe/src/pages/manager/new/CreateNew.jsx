import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import newsService from "../../../services/api/newsService";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  content: "",
  author: "",
  image: ""
};

const CreateNews = ({ open, onClose, onCreate }) => {
  const [newsData, setNewsData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewsData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    if (!newsData.title || !newsData.content) {
      toast.warning("❗ Vui lòng nhập tiêu đề và nội dung!");
      return;
    }

    try {
      const res = await newsService.createNews(newsData);
      toast.success("🎉 Thêm tin tức thành công!");
      onCreate(res); // Gửi tin tức mới về NewsDashboard
      setNewsData(initialState); // Reset form
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("❌ Lỗi khi thêm tin tức!");
    }
  };

  const handleClose = () => {
    setNewsData(initialState); // Reset khi đóng dialog
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Thêm Tin Tức
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8, color: "gray" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <TextField
          label="Tiêu đề"
          name="title"
          value={newsData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Nội dung"
          name="content"
          value={newsData.content}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tác giả"
          name="author"
          value={newsData.author}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Link ảnh (thumbnail)"
          name="image"
          value={newsData.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateNews;
