import { type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  addFiles,
  updateProgress,
  updateStatus,
} from "../store/slices/uploadSlice";
import { v4 as uuid } from "uuid";
import {
  Button,
  Typography,
  List,
  ListItem,
  LinearProgress,
  Box,
} from "@mui/material";

export default function Upload() {
  const dispatch = useDispatch();
  const files = useSelector((state: RootState) => state.upload.files);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files;
    if (!selected) return;

    const newFiles = Array.from(selected).map((file) => ({
      id: uuid(),
      name: file.name,
      size: file.size,
      progress: 0,
      status: "uploading" as const,
    }));

    dispatch(addFiles(newFiles));

    // simulate upload progress
    newFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (progress <= 100) {
          dispatch(updateProgress({ id: file.id, progress }));
        }
        if (progress >= 100) {
          clearInterval(interval);
          dispatch(updateStatus({ id: file.id, status: "success" }));
        }
      }, 300);
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h5" gutterBottom>
        Upload Images
      </Typography>

      <Button variant="contained" component="label">
        Select Images
        <input
          type="file"
          hidden
          accept="image/jpeg,image/jpg"
          multiple
          onChange={handleFileSelect}
        />
      </Button>

      <List>
        {files.map((f) => (
          <ListItem key={f.id} sx={{ flexDirection: "column", alignItems: "flex-start" }}>
            <Typography>{f.name} ({(f.size / 1024).toFixed(1)} KB)</Typography>
            <Box sx={{ width: "100%", mt: 1 }}>
              <LinearProgress variant="determinate" value={f.progress} />
            </Box>
            <Typography variant="body2">Status: {f.status}</Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
