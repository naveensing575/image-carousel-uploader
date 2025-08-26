import { useState } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./pages/Upload";
import Carousel from "./pages/Carousel";
import Layout from "./components/Layout";

function App() {
  const [mode, setMode] = useState<"light" | "dark">("dark");
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout
          mode={mode}
          toggleMode={() => setMode(mode === "light" ? "dark" : "light")}
        >
          <Routes>
            <Route path="/" element={<Upload />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/carousel" element={<Carousel />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
