import { useDispatch } from "react-redux";
import {
  updateStatus,
  resetFile,
  type UploadFile,
} from "../../store/slices/uploadSlice";
import {
  pauseUpload,
  resumeUpload,
  retryUpload,
} from "../../utils/uploadManager";
import { type AppDispatch } from "../../store";
import {
  ListItem,
  Typography,
  LinearProgress,
  Box,
  IconButton,
  Avatar,
} from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";

interface FileItemProps {
  file: UploadFile;
}

export default function FileItem({ file }: FileItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handlePause = () => {
    pauseUpload(file.id);
    dispatch(updateStatus({ id: file.id, status: "paused" }));
  };

  const handleResume = () => {
    dispatch(updateStatus({ id: file.id, status: "uploading" }));
    resumeUpload(file.id, file.progress, dispatch);
  };

  const handleRetry = () => {
    dispatch(resetFile({ id: file.id }));
    retryUpload(file.id, dispatch);
  };

  return (
    <ListItem
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "100%",
        mb: 2,
        p: 1,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      {/* Thumbnail preview */}
      <Avatar
        variant="rounded"
        src={file.url}
        alt={file.name}
        sx={{ width: 60, height: 60 }}
      />

      <Box sx={{ flex: 1 }}>
        <Typography sx={{ fontWeight: 500 }}>{file.name}</Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Box sx={{ flex: 1, mr: 2 }}>
            <LinearProgress
              variant="determinate"
              value={file.progress}
              sx={{
                height: 8,
                borderRadius: 5,
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#FFC107",
                },
              }}
            />
            <Typography
              variant="body2"
              sx={{ mt: 0.5, fontStyle: "italic", color: "text.secondary" }}
            >
              {file.status === "uploading" && "Uploading..."}
              {file.status === "paused" && "Paused"}
              {file.status === "success" && "Success"}
              {file.status === "error" && "Error"}
            </Typography>
          </Box>

          {file.status === "uploading" && (
            <IconButton
              onClick={handlePause}
              sx={{ bgcolor: "grey.800", color: "#FFC107" }}
            >
              <PauseIcon />
            </IconButton>
          )}
          {file.status === "paused" && (
            <IconButton
              onClick={handleResume}
              sx={{ bgcolor: "grey.800", color: "#FFC107" }}
            >
              <PlayArrowIcon />
            </IconButton>
          )}
          {file.status === "error" && (
            <IconButton
              onClick={handleRetry}
              sx={{ bgcolor: "grey.800", color: "#FFC107" }}
            >
              <ReplayIcon />
            </IconButton>
          )}
        </Box>
      </Box>
    </ListItem>
  );
}
