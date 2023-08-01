import Stack from "@mui/material/Stack";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { socket } from "../../../services/socket";

export default function NewTaskForm() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [inputValue, setNewValue] = useState("");

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setNewValue(value);
  }, []);

  const createNewTask = useCallback(() => {
    socket.emit("addNewTask", { value: inputValue });
    setNewValue("");
  }, [inputValue]);
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log("connected");
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value: string) {
      console.log("onFooEvent", value);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("onMessage1", onFooEvent);
    socket.emit("init", { data: "init" });
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
    };
  }, []);

  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="space-around"
      padding={2}
    >
      <TextField
        id="new-task-field"
        value={inputValue}
        onChange={onChange}
        label="Task name"
        disabled={!isConnected}
      />
      <Button variant="contained" onClick={createNewTask}>
        Add
      </Button>
    </Stack>
  );
}
