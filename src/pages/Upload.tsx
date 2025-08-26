import { type ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { addFiles } from "../store/slices/uploadSlice";
import { v4 as uuid } from "uuid";
import { Button, Typography, List, ListItem } from "@mui/material";

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
          <ListItem key={f.id}>
            {f.name} ({(f.size / 1024).toFixed(1)} KB) — {f.status}
          </ListItem>
        ))}
      </List>
    </div>
  );
}
