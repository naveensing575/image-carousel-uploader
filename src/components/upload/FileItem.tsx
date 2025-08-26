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
  IconButton,
} from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ReplayIcon from "@mui/icons-material/Replay";

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
    <ListItem sx={{ flexDirection: "column", alignItems: "flex-start", width: "100%" }}>
      <Typography>{file.name}</Typography>

      <Box sx={{ display: "flex", alignItems: "center", width: "100%", mt: 1 }}>
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
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {file.progress}% uploaded
          </Typography>
        </Box>

        {file.status === "uploading" && (
          <IconButton onClick={handlePause} sx={{ bgcolor: "grey.800", color: "#FFC107" }}>
            <PauseIcon />
          </IconButton>
        )}
        {file.status === "paused" && (
          <IconButton onClick={handleResume} sx={{ bgcolor: "grey.800", color: "#FFC107" }}>
            <PlayArrowIcon />
          </IconButton>
        )}
        {file.status === "error" && (
          <IconButton onClick={handleRetry} sx={{ bgcolor: "grey.800", color: "#FFC107" }}>
            <ReplayIcon />
          </IconButton>
        )}
      </Box>
    </ListItem>
  );
}
