import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import uploadReducer, { type UploadFile } from "../../../store/slices/uploadSlice";
import FileItem from "../../../components/upload/FileItem";
import { vi } from "vitest";
import * as uploadManager from "../../../utils/uploadManager";

function renderWithStore(file: UploadFile) {
  const store = configureStore({
    reducer: { upload: uploadReducer },
    preloadedState: { upload: { files: [file] } },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <FileItem file={file} />
      </Provider>
    ),
  };
}

describe("FileItem Component", () => {
  const baseFile: UploadFile = {
    id: "1",
    name: "test.jpg",
    url: "http://localhost/test.jpg",
    size: 123,
    progress: 50,
    status: "uploading",
  };

  it("renders file name and progress", () => {
    renderWithStore(baseFile);
    expect(screen.getByText("test.jpg")).toBeInTheDocument();
    expect(screen.getByText(/Uploading/i)).toBeInTheDocument();
  });

  it("shows pause button when uploading", () => {
    renderWithStore(baseFile);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows play button when paused", () => {
    const pausedFile = { ...baseFile, status: "paused" as const };
    renderWithStore(pausedFile);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("shows retry button when error", () => {
    const errorFile = { ...baseFile, status: "error" as const };
    renderWithStore(errorFile);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls pauseUpload when pause clicked", () => {
    const spy = vi.spyOn(uploadManager, "pauseUpload");
    renderWithStore(baseFile);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(spy).toHaveBeenCalledWith("1");
  });

  it("calls resumeUpload when play clicked", () => {
    const spy = vi.spyOn(uploadManager, "resumeUpload");
    const pausedFile = { ...baseFile, status: "paused" as const };
    renderWithStore(pausedFile);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(spy).toHaveBeenCalled();
  });

  it("calls retryUpload when retry clicked", () => {
    const spy = vi.spyOn(uploadManager, "retryUpload");
    const errorFile = { ...baseFile, status: "error" as const };
    renderWithStore(errorFile);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(spy).toHaveBeenCalled();
  });
});
