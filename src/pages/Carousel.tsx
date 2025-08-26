import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  useTheme,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const VISIBLE_COUNT = 7;

export default function Carousel() {
  const { files } = useSelector((state: RootState) => state.upload);
  const theme = useTheme();

  const images = files.filter((f) => f.status === "success");

  const [activeIndex, setActiveIndex] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  useEffect(() => {
    if (activeIndex < offset) {
      setOffset(activeIndex);
    } else if (activeIndex >= offset + VISIBLE_COUNT) {
      setOffset(activeIndex - VISIBLE_COUNT + 1);
    }
  }, [activeIndex, offset]);

  if (images.length === 0) {
    return (
      <Typography
        variant="h6"
        sx={{ textAlign: "center", mt: 4, mx: { xs: 2, sm: "1em" } }}
      >
        No uploaded images available
      </Typography>
    );
  }

  const visibleImages = images.slice(offset, offset + VISIBLE_COUNT);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: { xs: 2, sm: 3 },
        bgcolor: "background.default",
        height: "100%",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 2, fontSize: { xs: "1.5rem", sm: "2rem" } }}
      >
        Carousel
      </Typography>

      <Card
        sx={{
          maxWidth: { xs: "100%", sm: 500 },
          width: "100%",
          mb: 2,
          bgcolor: "transparent",
          boxShadow: "none",
        }}
      >
        <CardMedia
          component="img"
          image={images[activeIndex]?.url}
          alt={images[activeIndex]?.name}
          sx={{
            borderRadius: 2,
            objectFit: "contain",
            maxHeight: { xs: "50vh", sm: "70vh" },
            width: "100%",
          }}
        />
      </Card>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton
          onClick={() =>
            setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
          }
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            overflow: "hidden",
            width: { xs: `${VISIBLE_COUNT * 50}px`, sm: `${VISIBLE_COUNT * 80}px` },
          }}
        >
          {visibleImages.map((img, idx) => {
            const globalIndex = offset + idx;
            return (
              <Card
                key={img.id}
                onClick={() => setActiveIndex(globalIndex)}
                sx={{
                  border:
                    globalIndex === activeIndex
                      ? "3px solid #FFC107"
                      : `2px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  width: { xs: 50, sm: 80 },
                  height: { xs: 50, sm: 80 },
                }}
              >
                <CardMedia
                  component="img"
                  image={img.url}
                  alt={img.name}
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Card>
            );
          })}
        </Box>

        <IconButton
          onClick={() => setActiveIndex((prev) => (prev + 1) % images.length)}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
