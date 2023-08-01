import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState,
} from "react";
import { socket } from "../../../services/socket";

export default function SearchForm() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    socket.emit("filterByName", value);
  }, []);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
  }, []);

  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="space-around"
      padding={2}
    >
      <TextField id="search-field" label="Search" onChange={onChange} />
    </Stack>
  );
}
