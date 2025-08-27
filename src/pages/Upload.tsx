import { type ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addFiles } from "../store/slices/uploadSlice";
import { v4 as uuid } from "uuid";
import {
  Button,
  Typography,
  Box,
  Snackbar,
  Alert,
  Paper,
  Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileList from "../components/upload/FileList";
import { startUpload } from "../utils/uploadManager";
import { type AppDispatch } from "../store";

export default function Upload() {
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

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
        let reason = "";
        if (!isValidType) reason = "Invalid type";
        if (!isValidSize) reason = reason ? `${reason}, too large` : "Too large";
        invalidFiles.push(`${file.name} (${reason})`);
      }
    });

    if (invalidFiles.length > 0) {
      setError(`Invalid files selected: ${invalidFiles.join(", ")}`);
      setOpen(true);
      return;
    }

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
  };

  const handleClose = () => {
    setOpen(false);
    setError(null);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: "bold", color: "text.primary", }}
      >
        Upload Files
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
          bgcolor: "#1E1E1E",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          component="label"
          endIcon={<CloudUploadIcon />}
          sx={{
            bgcolor: "#FFC107",
            color: "black",
            fontWeight: "bold",
            borderRadius: "25px",
            px: { xs: 3, sm: 5 },
            py: { xs: 1.2, sm: 1.5 },
            fontSize: { xs: "0.9rem", sm: "1rem" },
            "&:hover": { bgcolor: "#e6ac00" },
          }}
        >
          Upload Photos
          <input
            type="file"
            hidden
            accept="image/jpeg,image/jpg"
            multiple
            onChange={handleFileSelect}
          />
        </Button>
      </Paper>

      <Stack spacing={2} sx={{ flex: 1, overflowY: "auto" }}>
        <FileList />
      </Stack>

      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
