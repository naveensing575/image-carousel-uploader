import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import FileItem from "./FileItem";
import { List } from "@mui/material";

export default function FileList() {
  const files = useSelector((state: RootState) => state.upload.files);

  return (
    <List>
      {files.map((f) => (
        <FileItem key={f.id} file={f} />
      ))}
    </List>
  );
}
