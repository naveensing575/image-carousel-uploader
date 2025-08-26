import { useDispatch } from "react-redux";
import {
  updateStatus,
  type UploadFile,
} from "../../store/slices/uploadSlice";
import {
  ListItem,
  Typography,
  LinearProgress,
  Box,
  Button,
} from "@mui/material";

interface FileItemProps {
  file: UploadFile;
}

export default function FileItem({ file }: FileItemProps) {
  const dispatch = useDispatch();

  const handlePause = () => {
    dispatch(updateStatus({ id: file.id, status: "paused" }));
  };

  const handleResume = () => {
    dispatch(updateStatus({ id: file.id, status: "uploading" }));
  };

  const handleRetry = () => {
    dispatch(updateStatus({ id: file.id, status: "uploading" }));
  };

  return (
    <ListItem sx={{ flexDirection: "column", alignItems: "flex-start" }}>
      <Typography>
        {file.name} ({(file.size / 1024).toFixed(1)} KB)
      </Typography>

      <Box sx={{ width: "100%", mt: 1 }}>
        <LinearProgress variant="determinate" value={file.progress} />
      </Box>

      <Typography variant="body2" sx={{ mt: 1 }}>
        Status: {file.status}
      </Typography>

      <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
        {file.status === "uploading" && (
          <Button size="small" variant="outlined" onClick={handlePause}>
            Pause
          </Button>
        )}
        {file.status === "paused" && (
          <Button size="small" variant="contained" onClick={handleResume}>
            Resume
          </Button>
        )}
        {file.status === "error" && (
          <Button size="small" color="error" onClick={handleRetry}>
            Retry
          </Button>
        )}
      </Box>
    </ListItem>
  );
}
