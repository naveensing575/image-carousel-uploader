import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { setActiveIndex } from "../store/slices/carouselSlice";
import { Box, Typography } from "@mui/material";

export default function Carousel() {
  const dispatch = useDispatch();
  const { images, activeIndex } = useSelector((state: RootState) => state.carousel);

  if (images.length === 0) {
    return <Typography>No images available</Typography>;
  }

  return (
    <Box sx={{ padding: "2rem", textAlign: "center" }}>
      {/* Large image */}
      <Box sx={{ mb: 2 }}>
        <img
          src={images[activeIndex].url}
          alt={images[activeIndex].alt}
          style={{ width: "80%", borderRadius: "8px" }}
        />
      </Box>

      {/* Thumbnails */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
        {images.map((img, idx) => (
          <img
            key={img.id}
            src={img.url}
            alt={img.alt}
            onClick={() => dispatch(setActiveIndex(idx))}
            style={{
              width: "100px",
              height: "60px",
              objectFit: "cover",
              border: idx === activeIndex ? "3px solid blue" : "2px solid gray",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
