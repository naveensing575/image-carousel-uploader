import { Box, IconButton, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ImageIcon from "@mui/icons-material/Image";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

interface LayoutProps {
  children: React.ReactNode;
  mode: "light" | "dark";
  toggleMode: () => void;
}

export default function Layout({ children, mode, toggleMode }: LayoutProps) {
  const location = useLocation();
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          width: { xs: 60, sm: 80 },
          bgcolor: "background.default",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          color: "text.primary",
          py: 2,
          borderRight: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <IconButton
            component={Link}
            to="/upload"
            sx={{
              bgcolor:
                location.pathname === "/upload"
                  ? theme.palette.action.selected
                  : "transparent",
              color: theme.palette.text.primary,
            }}
          >
            <CloudUploadIcon />
          </IconButton>
          <IconButton
            component={Link}
            to="/carousel"
            sx={{
              bgcolor:
                location.pathname === "/carousel"
                  ? theme.palette.action.selected
                  : "transparent",
              color: theme.palette.text.primary,
            }}
          >
            <ImageIcon />
          </IconButton>
        </Box>

        <IconButton
          onClick={toggleMode}
          sx={{ color: theme.palette.text.primary }}
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>

      <Box
        sx={{
          flex: 1,
          bgcolor: "background.default",
          color: "text.primary",
          overflowY: "auto",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
