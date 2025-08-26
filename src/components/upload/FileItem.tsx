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
  useTheme,
} from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";

interface FileItemProps {
  file: UploadFile;
}

export default function FileItem({ file }: FileItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

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

  const getStatusText = () => {
    switch (file.status) {
      case "uploading":
        return { text: "Uploading...", color: theme.palette.warning.main };
      case "paused":
        return { text: "Paused", color: theme.palette.info.main };
      case "success":
        return { text: "Success", color: theme.palette.success.main };
      case "error":
        return { text: "Error", color: theme.palette.error.main };
      default:
        return { text: "", color: theme.palette.text.secondary };
    }
  };

  const { text, color } = getStatusText();

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
              sx={{ mt: 0.5, fontStyle: "italic", color }}
            >
              {text}
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
