import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { setActiveIndex, nextImage, prevImage } from "../store/slices/carouselSlice";
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
  const dispatch = useDispatch();
  const { activeIndex } = useSelector((state: RootState) => state.carousel);
  const { files } = useSelector((state: RootState) => state.upload);
  const theme = useTheme();

  const [offset, setOffset] = useState(0);

  const images = files.filter((f) => f.status === "success"); // 👈 only completed uploads

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        dispatch(nextImage());
      } else if (e.key === "ArrowLeft") {
        dispatch(prevImage());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [dispatch]);

  useEffect(() => {
    if (activeIndex < offset) {
      setOffset(activeIndex);
    } else if (activeIndex >= offset + VISIBLE_COUNT) {
      setOffset(activeIndex - VISIBLE_COUNT + 1);
    }
  }, [activeIndex, offset]);

  if (images.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4, marginLeft: '1em' }}>
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
        p: 3,
        bgcolor: "background.default",
        height: "100%",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: "bold", mb: 2 }}
      >
        Carousel
      </Typography>

      <Card
        sx={{
          maxWidth: 500,
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
            maxHeight: "70vh",
            width: "100%",
          }}
        />
      </Card>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <IconButton onClick={() => dispatch(prevImage())}>
          <ArrowBackIosNewIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            overflow: "hidden",
            width: `${VISIBLE_COUNT * 80}px`,
          }}
        >
          {visibleImages.map((img, idx) => {
            const globalIndex = offset + idx;
            return (
              <Card
                key={img.id}
                onClick={() => dispatch(setActiveIndex(globalIndex))}
                sx={{
                  border:
                    globalIndex === activeIndex
                      ? "3px solid #FFC107"
                      : `2px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  width: 80,
                  height: 80,
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

        <IconButton onClick={() => dispatch(nextImage())}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
