import { type ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { addFiles } from "../store/slices/uploadSlice";
import { v4 as uuid } from "uuid";
import { Button, Typography, Box } from "@mui/material";
import FileList from "../components/upload/FileList";
import { startUpload } from "../utils/uploadManager";
import { type AppDispatch } from "../store";

export default function Upload() {
  const dispatch = useDispatch<AppDispatch>();

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    Array.from(selected).forEach((file) => {
      const isValidType =
        file.type === "image/jpeg" || file.type === "image/jpg";
      const isValidSize = file.size <= 5 * 1024 * 1024;

      if (isValidType && isValidSize) {
        validFiles.push(file);
      } else {
        invalidFiles.push(file.name);
      }
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
      newFiles.forEach((f) => startUpload(f.id, dispatch));
    }

    if (invalidFiles.length > 0) {
      console.warn("Invalid files:", invalidFiles);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Upload
      </Typography>

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
