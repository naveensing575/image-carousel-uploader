import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface UploadFile {
  id: string;
  name: string;
  size: number;
  url: string; // preview + carousel use
  progress: number;
  status: "uploading" | "success" | "error" | "paused";
}

interface UploadState {
  files: UploadFile[];
}

const initialState: UploadState = {
  files: [],
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    addFiles: (state, action: PayloadAction<UploadFile[]>) => {
      state.files.push(...action.payload);
    },
    updateProgress: (
      state,
      action: PayloadAction<{ id: string; progress: number }>
    ) => {
      const file = state.files.find((f) => f.id === action.payload.id);
      if (file) file.progress = action.payload.progress;
    },
    updateStatus: (
      state,
      action: PayloadAction<{ id: string; status: UploadFile["status"] }>
    ) => {
      const file = state.files.find((f) => f.id === action.payload.id);
      if (file) file.status = action.payload.status;
    },
    resetFile: (state, action: PayloadAction<{ id: string }>) => {
      const file = state.files.find((f) => f.id === action.payload.id);
      if (file) {
        file.progress = 0;
        file.status = "uploading";
      }
    },
    removeFile: (state, action: PayloadAction<{ id: string }>) => {
      state.files = state.files.filter((f) => f.id !== action.payload.id);
    },
    clearAllFiles: (state) => {
      state.files = [];
    },
  },
});

export const {
  addFiles,
  updateProgress,
  updateStatus,
  resetFile,
  removeFile,
  clearAllFiles,
} = uploadSlice.actions;
export default uploadSlice.reducer;
