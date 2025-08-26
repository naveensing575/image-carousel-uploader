import { useState } from "react";
import { ThemeProvider, CssBaseline, Button, AppBar, Toolbar } from "@mui/material";
import { getTheme } from "./theme/theme";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Upload from "./pages/Upload";
import Carousel from "./pages/Carousel";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <nav>
              <Button color="inherit" component={Link} to="/upload">
                Upload
              </Button>
              <Button color="inherit" component={Link} to="/carousel">
                Carousel
              </Button>
            </nav>
            <Button
              color="inherit"
              onClick={() => setMode(mode === "light" ? "dark" : "light")}
            >
              Toggle {mode === "light" ? "Dark" : "Light"}
            </Button>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/carousel" element={<Carousel />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
