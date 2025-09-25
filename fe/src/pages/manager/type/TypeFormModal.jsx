import React, { useEffect, useState } from "react";
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

const TypeFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnails, setThumbnails] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setDescription(initialData.description || "");
      setThumbnails(initialData.thumbnails || "");
    } else {
      setName("");
      setDescription("");
      setThumbnails("");
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) return;
    onSubmit({
      id: initialData?.id || Date.now(),
      name,
      description,
      thumbnails,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? "Sửa" : "Tạo"} loại sân
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <TextField
          margin="dense"
          label="Tên loại sân"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Mô tả"
          fullWidth
          multiline
          minRows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Thumbnail URL"
          fullWidth
          value={thumbnails}
          onChange={(e) => setThumbnails(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          {initialData ? "Sửa" : "Tạo"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TypeFormModal;