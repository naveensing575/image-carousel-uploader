import { useEffect, useRef, useState, useCallback } from "react";
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

export default function Carousel() {
  const { files } = useSelector((state: RootState) => state.upload);
  const theme = useTheme();

  const images = files.filter((f) => f.status === "success");

  const [activeIndex, setActiveIndex] = useState(0);
  const thumbsRef = useRef<(HTMLDivElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  useEffect(() => {
    const el = thumbsRef.current[activeIndex];
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) {
      handlePrev();
    } else if (deltaX < -50) {
      handleNext();
    }
    touchStartX.current = null;
  };

  if (images.length === 0) {
    return (
      <Typography
        variant="h6"
        sx={{ textAlign: "center", mt: 4, color: "text.primary" }}
      >
        No uploaded images available
      </Typography>
    );
  }

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
        sx={{
          fontWeight: "bold",
          mb: 2,
          fontSize: { xs: "1.5rem", sm: "2rem" },
          color: "text.primary",
        }}
      >
        Carousel
      </Typography>

      <Card
        sx={{
          maxWidth: { xs: "100%", sm: 600 },
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
          loading="lazy"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          sx={{
            borderRadius: 2,
            objectFit: "contain",
            maxHeight: { xs: "50vh", sm: "65vh" },
            width: "100%",
            bgcolor: "background.paper",
          }}
        />
      </Card>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <IconButton onClick={handlePrev} aria-label="Previous image">
          <ArrowBackIosNewIcon />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            px: 1,
            py: 1.5,
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {images.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <Card
                key={img.id}
                component="div"
                ref={(el: HTMLDivElement | null) => {
                  thumbsRef.current[idx] = el;
                }}
                onClick={() => setActiveIndex(idx)}
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                sx={{
                  border: isActive
                    ? `3px solid ${theme.palette.warning.main}`
                    : `2px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  overflow: "hidden",
                  cursor: "pointer",
                  outline: "none",
                  width: { xs: 70, sm: 100 },
                  height: { xs: 70, sm: 100 },
                  flexShrink: 0,
                  transform: isActive ? "scale(1.2)" : "scale(1)",
                  opacity: isActive ? 1 : 0.6,
                  zIndex: isActive ? 2 : 1,
                  transition: "all 0.3s ease",
                  "&:focus": {
                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={img.url}
                  alt={img.name}
                  loading="lazy"
                  sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Card>
            );
          })}
        </Box>

        <IconButton onClick={handleNext} aria-label="Next image">
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
