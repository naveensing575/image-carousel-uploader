import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { setActiveIndex } from "../store/slices/carouselSlice";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  ImageList,
  ImageListItem,
  Paper,
} from "@mui/material";

export default function Carousel() {
  const dispatch = useDispatch();
  const { images, activeIndex } = useSelector(
    (state: RootState) => state.carousel
  );

  if (images.length === 0) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        No images available
      </Typography>
    );
  }

  return (
    <Box sx={{ padding: "2rem" }}>
      {/* Large image */}
      <Card sx={{ maxWidth: "80%", margin: "0 auto", mb: 3 }}>
        <CardMedia
          component="img"
          height="500"
          image={images[activeIndex].url}
          alt={images[activeIndex].alt}
          sx={{ borderRadius: 2 }}
        />
      </Card>

      {/* Thumbnails */}
      <Paper elevation={3} sx={{ p: 2, overflowX: "auto" }}>
        <ImageList cols={7} rowHeight={100} sx={{ flexWrap: "nowrap" }}>
          {images.map((img, idx) => (
            <ImageListItem key={img.id} sx={{ cursor: "pointer" }}>
              <Card
                onClick={() => dispatch(setActiveIndex(idx))}
                sx={{
                  border:
                    idx === activeIndex ? "3px solid #1976d2" : "2px solid gray",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <CardMedia
                  component="img"
                  image={img.url}
                  alt={img.alt}
                  sx={{ height: 100, objectFit: "cover" }}
                />
              </Card>
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>
    </Box>
  );
}
