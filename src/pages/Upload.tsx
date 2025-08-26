import { type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { addFiles } from "../store/slices/uploadSlice";
import { v4 as uuid } from "uuid";
import { Button, Typography, Box } from "@mui/material";
import FileList from "../components/upload/FileList";

export default function Upload() {
  const dispatch = useDispatch();

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const validFiles = Array.from(selected).filter((file) => {
      const isValidType =
        file.type === "image/jpeg" || file.type === "image/jpg";
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });

    const newFiles = validFiles.map((file) => ({
      id: uuid(),
      name: file.name,
      size: file.size,
      url: URL.createObjectURL(file),
      progress: 0,
      status: "uploading" as const,
    }));

    if (newFiles.length > 0) {
      dispatch(addFiles(newFiles));
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Upload
      </Typography>

      {/* Yellow Upload Button */}
      <Button
        variant="contained"
        component="label"
        sx={{
          bgcolor: "#FFC107",
          color: "black",
          fontWeight: "bold",
          borderRadius: "30px",
          px: 4,
          py: 1.5,
          "&:hover": { bgcolor: "#e6ac00" },
        }}
      >
        UPLOAD PHOTOS
        <input
          type="file"
          hidden
          accept="image/jpeg,image/jpg"
          multiple
          onChange={handleFileSelect}
        />
      </Button>

      <FileList />
    </Box>
  );
}
