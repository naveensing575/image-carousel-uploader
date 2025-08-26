import { createSlice } from "@reduxjs/toolkit";

interface UploadState {
  files: unknown[];
}

const initialState: UploadState = {
  files: [],
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {},
});

export default uploadSlice.reducer;
