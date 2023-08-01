import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { socket } from "../../services/socket";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
} from "@mui/material";

export default function DeleteAllButton({
  isLoggedIn,
}: {
  isLoggedIn: boolean;
}) {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [open, setOpen] = useState(false);
  const deleteAll = useCallback(() => {
    socket.emit("deleteAll", { data: "deleteAll" });
    setOpen(false);
  }, []);
  const onButtonnClick = useCallback(() => {
    setOpen(true);
  }, []);
  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("connected");
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    // socket.emit("init", { data: "init" });
  }, []);
  if (!isLoggedIn) {
    return <></>;
  }
  return (
    <>
      <Button variant="text" onClick={onButtonnClick}>
        Delete all tasks
      </Button>
      <Dialog
        open={open}
        onClose={onClose}
        PaperComponent={Paper}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Delete all
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete all tasks?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={deleteAll}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
