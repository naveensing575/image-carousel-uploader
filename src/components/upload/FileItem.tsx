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
  Paper,
  Stack,
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
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        mb: 2,
      }}
    >
      <ListItem
        sx={{
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
          p: 0,
        }}
      >
        <Avatar
          variant="rounded"
          src={file.url}
          alt={file.name}
          sx={{ width: 64, height: 64 }}
        />

        <Stack flex={1} spacing={1}>
          <Typography
            variant="body1"
            noWrap
            sx={{ fontWeight: 600, color: "white" }}
          >
            {file.name}
          </Typography>

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
            sx={{ fontStyle: "italic", color, fontWeight: 500 }}
          >
            {text}
          </Typography>
        </Stack>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {file.status === "uploading" && (
            <IconButton sx={{ bgcolor: "grey.900", color: "#FFC107" }} onClick={handlePause}>
              <PauseIcon />
            </IconButton>
          )}
          {file.status === "paused" && (
            <IconButton sx={{ bgcolor: "grey.900", color: "#FFC107" }} onClick={handleResume}>
              <PlayArrowIcon />
            </IconButton>
          )}
          {file.status === "error" && (
            <IconButton sx={{ bgcolor: "grey.900", color: "#FFC107" }} onClick={handleRetry}>
              <ReplayIcon />
            </IconButton>
          )}
        </Box>
      </ListItem>
    </Paper>
  );
}
