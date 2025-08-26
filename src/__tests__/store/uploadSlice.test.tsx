// src/__tests__/store/uploadSlice.test.ts
import reducer, {
  addFiles,
  updateProgress,
  updateStatus,
  resetFile,
  removeFile,
  clearAllFiles,
  type UploadFile,
} from "../../store/slices/uploadSlice";

describe("uploadSlice", () => {
  const initialState = { files: [] as UploadFile[] };

  const sampleFile: UploadFile = {
    id: "1",
    name: "file1.jpg",
    size: 123,
    url: "http://localhost/file1.jpg",
    progress: 0,
    status: "uploading",
  };

  it("should handle initial state", () => {
    expect(reducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should add files", () => {
    const next = reducer(initialState, addFiles([sampleFile]));
    expect(next.files.length).toBe(1);
    expect(next.files[0].id).toBe("1");
  });

  it("should update progress", () => {
    const state: { files: UploadFile[] } = { files: [sampleFile] };
    const next = reducer(state, updateProgress({ id: "1", progress: 50 }));
    expect(next.files[0].progress).toBe(50);
  });

  it("should update status", () => {
    const state: { files: UploadFile[] } = { files: [sampleFile] };
    const next = reducer(state, updateStatus({ id: "1", status: "success" }));
    expect(next.files[0].status).toBe("success");
  });

  it("should reset file", () => {
    const state: { files: UploadFile[] } = {
      files: [{ ...sampleFile, progress: 80, status: "error" as const }],
    };
    const next = reducer(state, resetFile({ id: "1" }));
    expect(next.files[0].progress).toBe(0);
    expect(next.files[0].status).toBe("uploading");
  });

  it("should remove file", () => {
    const state: { files: UploadFile[] } = { files: [sampleFile] };
    const next = reducer(state, removeFile({ id: "1" }));
    expect(next.files.length).toBe(0);
  });

  it("should clear all files", () => {
    const state: { files: UploadFile[] } = { files: [sampleFile] };
    const next = reducer(state, clearAllFiles());
    expect(next.files.length).toBe(0);
  });
});
