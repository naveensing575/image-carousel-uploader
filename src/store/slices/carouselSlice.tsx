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
  images: [
    { id: "1", url: "https://picsum.photos/id/1015/800/500", alt: "Mountain" },
    { id: "2", url: "https://picsum.photos/id/1025/800/500", alt: "Dog" },
    { id: "3", url: "https://picsum.photos/id/1035/800/500", alt: "River" },
    { id: "4", url: "https://picsum.photos/id/1045/800/500", alt: "Forest" },
    { id: "5", url: "https://picsum.photos/id/1066/800/500", alt: "Desert" },
    { id: "6", url: "https://picsum.photos/id/1072/800/500", alt: "truck" },
    { id: "7", url: "https://picsum.photos/id/1081/800/500", alt: "pyramid" },
  ],
  activeIndex: 0,
};

const carouselSlice = createSlice({
  name: "carousel",
  initialState,
  reducers: {
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

export const { setActiveIndex, nextImage, prevImage } = carouselSlice.actions;
export default carouselSlice.reducer;
