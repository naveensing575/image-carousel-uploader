import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import uploadReducer, { type UploadFile } from "../../../store/slices/uploadSlice";
import FileList from "../../../components/upload/FileList";

function renderWithStore(files: UploadFile[]) {
  const store = configureStore({
    reducer: { upload: uploadReducer },
    preloadedState: { upload: { files } },
  });

  return render(
    <Provider store={store}>
      <FileList />
    </Provider>
  );
}

describe("FileList Component", () => {
  it("renders no FileItem when no files", () => {
    renderWithStore([]);
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("renders one FileItem per file", () => {
    const files: UploadFile[] = [
      {
        id: "1",
        name: "file1.jpg",
        url: "http://localhost/file1.jpg",
        size: 111,
        progress: 50,
        status: "uploading",
      },
      {
        id: "2",
        name: "file2.jpg",
        url: "http://localhost/file2.jpg",
        size: 222,
        progress: 100,
        status: "success",
      },
    ];

    renderWithStore(files);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(screen.getByText("file1.jpg")).toBeInTheDocument();
    expect(screen.getByText("file2.jpg")).toBeInTheDocument();
  });
});
