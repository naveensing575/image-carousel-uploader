# Image Carousel Uploader

A frontend assignment project built with **React, TypeScript, Redux Toolkit, React Router, Material UI (MUI)**, and **Vite**.  
The application allows users to upload images with simulated progress, manage upload states, and view uploaded images in a responsive carousel.

---

## Features

### Upload Screen
- Select multiple images (`.jpg`/`.jpeg` only, max size 5MB).
- Simulated file upload with per-file progress bar.
- Upload status indicators:
  - Uploading
  - Paused
  - Success
  - Error
- Control uploads with Pause, Resume, and Retry actions.
- Thumbnails preview for all uploaded images.

### Carousel Screen
- Displays uploaded images in a large preview area.
- Thumbnail strip with exactly 7 visible images at a time.
- Active image highlighted in the strip.
- Navigate with:
  - Thumbnail clicks
  - Left/Right arrow keys
- Carousel shifts automatically; no scrollbars.

### General
- Responsive design for desktop and mobile.
- Light/Dark mode toggle using Material UI theme.
- State management with Redux Toolkit.
- Linting and formatting integrated with ESLint and Prettier.

---

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Material UI (MUI)](https://mui.com/)
- [React Router](https://reactrouter.com/)
- [Vite](https://vitejs.dev/)
- [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for testing

---

## Project Structure

```
src/
  components/
    carousel/
    upload/
  pages/
  store/
    slices/
  theme/
  utils/
```

---

## Getting Started

### Prerequisites
- Node.js (>=16.x)
- npm (>=8.x)

### Installation
```bash
git clone <repository-url>
cd image-carousel-uploader
npm install
```

### Development
```bash
npm run dev
```

### Lint & Format
```bash
npm run lint
npm run format
```

### Build
```bash
npm run build
```

### Test
```bash
npm run test
```

---

## Deployment

The project can be deployed to platforms like **Vercel** or **Netlify**.  
For example, with Vercel:
```bash
npm run build
vercel deploy --prod
```

---

## License

This project was created for assignment purposes.  
Feel free to use it as a reference for educational or personal projects.
