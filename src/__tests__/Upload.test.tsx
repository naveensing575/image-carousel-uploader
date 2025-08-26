// src/__tests__/Upload.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import uploadReducer, { type UploadFile } from "../store/slices/uploadSlice";
import Upload from "../pages/Upload";
import { vi } from "vitest";

function renderWithStore(initialFiles: UploadFile[] = []) {
  const store = configureStore({
    reducer: { upload: uploadReducer },
    preloadedState: { upload: { files: initialFiles } },
  });

  return {
    store,
    ...render(
      <Provider store={store}>
        <Upload />
      </Provider>
    ),
  };
}

describe("Upload Page", () => {
  it("renders upload button", () => {
    renderWithStore();
    expect(screen.getByText(/UPLOAD PHOTOS/i)).toBeInTheDocument();
  });

  it("accepts valid jpeg file and dispatches addFiles", () => {
    const { store } = renderWithStore();
    const input = screen.getByLabelText(/UPLOAD PHOTOS/i).querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    const file = new File(["dummy"], "test.jpg", { type: "image/jpeg" });
    fireEvent.change(input, { target: { files: [file] } });

    const files = store.getState().upload.files;
    expect(files.length).toBe(1);
    expect(files[0].name).toBe("test.jpg");
  });

  it("rejects invalid file and logs warning", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    renderWithStore();
    const input = screen.getByLabelText(/UPLOAD PHOTOS/i).querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;

    const file = new File(["dummy"], "bad.png", { type: "image/png" });
    fireEvent.change(input, { target: { files: [file] } });

    expect(warnSpy).toHaveBeenCalledWith("Invalid files:", ["bad.png"]);
    warnSpy.mockRestore();
  });
});
