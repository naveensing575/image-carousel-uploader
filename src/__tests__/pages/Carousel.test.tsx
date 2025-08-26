import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import uploadReducer, { type UploadFile } from "../../store/slices/uploadSlice";
import Carousel from "../../pages/Carousel";

function renderWithStore(files: UploadFile[]) {
  const store = configureStore({
    reducer: { upload: uploadReducer },
    preloadedState: { upload: { files } },
  });

  return render(
    <Provider store={store}>
      <Carousel />
    </Provider>
  );
}

describe("Carousel Component", () => {
  it("shows empty state when no images", () => {
    renderWithStore([]);
    expect(
      screen.getByText(/No uploaded images available/i)
    ).toBeInTheDocument();
  });

  it("renders large image when images exist", () => {
    const files: UploadFile[] = [
      {
        id: "1",
        name: "test image",
        url: "http://localhost/test.jpg",
        size: 1234,
        progress: 100,
        status: "success",
      },
    ];
    renderWithStore(files);

    // Query first img (large image is always rendered first)
    const img = screen.getAllByRole("img")[0];
    expect(img).toHaveAttribute("src", "http://localhost/test.jpg");
  });

  it("clicking thumbnail changes active image", () => {
    const files: UploadFile[] = [
      {
        id: "1",
        name: "image1",
        url: "http://localhost/image1.jpg",
        size: 111,
        progress: 100,
        status: "success",
      },
      {
        id: "2",
        name: "image2",
        url: "http://localhost/image2.jpg",
        size: 222,
        progress: 100,
        status: "success",
      },
    ];
    renderWithStore(files);

    const thumbnails = screen.getAllByRole("img");
    fireEvent.click(thumbnails[1]); // second image (thumbnail for image2)

    const active = screen.getAllByRole("img")[0]; // large image
    expect(active).toHaveAttribute("src", "http://localhost/image2.jpg");
  });

  it("navigates with right arrow key", () => {
    const files: UploadFile[] = [
      {
        id: "1",
        name: "image1",
        url: "http://localhost/image1.jpg",
        size: 111,
        progress: 100,
        status: "success",
      },
      {
        id: "2",
        name: "image2",
        url: "http://localhost/image2.jpg",
        size: 222,
        progress: 100,
        status: "success",
      },
    ];
    renderWithStore(files);

    fireEvent.keyDown(window, { key: "ArrowRight" });

    const active = screen.getAllByRole("img")[0]; // large image
    expect(active).toHaveAttribute("src", "http://localhost/image2.jpg");
  });

  it("navigates with left arrow key", () => {
    const files: UploadFile[] = [
      {
        id: "1",
        name: "image1",
        url: "http://localhost/image1.jpg",
        size: 111,
        progress: 100,
        status: "success",
      },
      {
        id: "2",
        name: "image2",
        url: "http://localhost/image2.jpg",
        size: 222,
        progress: 100,
        status: "success",
      },
    ];
    renderWithStore(files);

    // Move right first
    fireEvent.keyDown(window, { key: "ArrowRight" });
    let active = screen.getAllByRole("img")[0];
    expect(active).toHaveAttribute("src", "http://localhost/image2.jpg");

    // Move left to go back
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    active = screen.getAllByRole("img")[0];
    expect(active).toHaveAttribute("src", "http://localhost/image1.jpg");
  });
});
