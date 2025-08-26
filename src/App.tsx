import { useState } from "react";
import { ThemeProvider, CssBaseline, Button } from "@mui/material";
import { getTheme } from "./theme/theme";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Upload from "./pages/Carousel";
import Carousel from "./pages/Upload";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <header style={{ display: "flex", justifyContent: "space-between", padding: "1rem" }}>
          <nav>
            <Link to="/upload">Upload</Link> | <Link to="/carousel">Carousel</Link>
          </nav>
          <Button onClick={() => setMode(mode === "light" ? "dark" : "light")}>
            Toggle {mode === "light" ? "Dark" : "Light"}
          </Button>
        </header>
        <Routes>
          <Route path="/upload" element={<Upload />} />
          <Route path="/carousel" element={<Carousel />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
