import type { AppDispatch } from "../store";
import { updateProgress, updateStatus } from "../store/slices/uploadSlice";

const uploadIntervals: Map<string, ReturnType<typeof setInterval>> = new Map();

export function startUpload(
  id: string,
  dispatch: AppDispatch,
  resetProgress = 0
) {
  let progress = resetProgress;

  const interval = setInterval(() => {
    progress += 10;
    if (progress <= 100) {
      dispatch(updateProgress({ id, progress }));
    }
    if (progress >= 100) {
      clearInterval(interval);
      uploadIntervals.delete(id);
      dispatch(updateStatus({ id, status: "success" }));
    }
  }, 300);

  uploadIntervals.set(id, interval);
}

export function pauseUpload(id: string) {
  const interval = uploadIntervals.get(id);
  if (interval) {
    clearInterval(interval);
    uploadIntervals.delete(id);
  }
}

export function resumeUpload(
  id: string,
  currentProgress: number,
  dispatch: AppDispatch
) {
  let progress = currentProgress;

  const interval = setInterval(() => {
    progress += 10;
    if (progress <= 100) {
      dispatch(updateProgress({ id, progress }));
    }
    if (progress >= 100) {
      clearInterval(interval);
      uploadIntervals.delete(id);
      dispatch(updateStatus({ id, status: "success" }));
    }
  }, 300);

  uploadIntervals.set(id, interval);
}

export function retryUpload(id: string, dispatch: AppDispatch) {
  startUpload(id, dispatch, 0);
}
