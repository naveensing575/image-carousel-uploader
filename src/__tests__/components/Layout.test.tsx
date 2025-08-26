// src/__tests__/components/Layout.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Layout from "../../components/Layout";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

describe("Layout Component", () => {
  it("renders children content", () => {
    render(
      <MemoryRouter initialEntries={["/upload"]}>
        <Layout mode="light" toggleMode={() => {}}>
          <div data-testid="child">Hello Child</div>
        </Layout>
      </MemoryRouter>
    );
    expect(screen.getByTestId("child")).toHaveTextContent("Hello Child");
  });

  it("highlights upload icon when on /upload route", () => {
    render(
      <MemoryRouter initialEntries={["/upload"]}>
        <Layout mode="light" toggleMode={() => {}}>
          <div />
        </Layout>
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole("button");
    const uploadButton = buttons[0]; // first icon button is upload
    expect(uploadButton).not.toHaveStyle("background-color: transparent");
  });

  it("calls toggleMode when theme button clicked", () => {
    const toggleMock = vi.fn();
    render(
      <MemoryRouter initialEntries={["/upload"]}>
        <Layout mode="light" toggleMode={toggleMock}>
          <div />
        </Layout>
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole("button");
    const themeButton = buttons[buttons.length - 1];
    fireEvent.click(themeButton);
    expect(toggleMock).toHaveBeenCalled();
  });
});
