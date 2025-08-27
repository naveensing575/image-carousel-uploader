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
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, height: "100vh" }}>
      {/* Sidebar for desktop / bottom nav for mobile */}
      <Box
        sx={{
          width: { xs: "100%", sm: 80 },
          height: { xs: 60, sm: "100%" },
          bgcolor: "background.default",
          display: "flex",
          flexDirection: { xs: "row", sm: "column" },
          justifyContent: "space-between",
          alignItems: "center",
          color: "text.primary",
          py: { xs: 0, sm: 2 },
          px: { xs: 2, sm: 0 },
          borderTop: { xs: `1px solid ${theme.palette.divider}`, sm: "none" },
          borderRight: { xs: "none", sm: `1px solid ${theme.palette.divider}` },
        }}
      >
        {/* Nav Icons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "column" },
            gap: 2,
          }}
        >
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

        {/* Theme Toggle */}
        <IconButton onClick={toggleMode} sx={{ color: theme.palette.text.primary }}>
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>

      {/* Main Content */}
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
