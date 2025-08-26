import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CarouselImage {
  id: string;
  url: string;
  alt: string;
}

interface CarouselState {
  images: CarouselImage[];
  activeIndex: number;
}

const initialState: CarouselState = {
  images: [],
  activeIndex: 0,
};

const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
    setImages: (state, action: PayloadAction<CarouselImage[]>) => {
      state.images = action.payload;
      state.activeIndex = 0;
    },
    setActiveIndex: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.images.length) {
        state.activeIndex = action.payload;
      }
    },
    nextImage: (state) => {
      if (state.images.length > 0) {
        state.activeIndex = (state.activeIndex + 1) % state.images.length;
      }
    },
    prevImage: (state) => {
      if (state.images.length > 0) {
        state.activeIndex =
          (state.activeIndex - 1 + state.images.length) % state.images.length;
      }
    },
  },
});

export const { setImages, setActiveIndex, nextImage, prevImage } =
  carouselSlice.actions;
export default carouselSlice.reducer;
