import React, { useCallback, useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import VerifiedIcon from "@mui/icons-material/Verified";
import { socket } from "../../../services/socket";
import { Card, CardContent, Typography } from "@mui/material";

export default function DoneList() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [list, setList] = React.useState<any[]>([]);
  const updateTodoLists = useCallback(
    ({ content: { data } }: { content: { data: any[] } }) => {
      setList(
        data.sort(function (a, b) {
          if (a.value < b.value) {
            return -1;
          }
          if (a.value > b.value) {
            return 1;
          }
          return 0;
        })
      );
    },
    []
  );
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
    socket.on("updateDoneLists", updateTodoLists);
  }, []);

  const handleToggle = (task: Object) => () => {
    console.log("Change <<<<");
    socket.emit("taskUpdate", { ...task, isDone: false });
  };

  return (
    <Card sx={{ width: "40%" }}>
      <CardContent>
        <Typography variant="h5" component="div">
          DoneList:
        </Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {list.map((task) => {
            const { value } = task;

            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments">
                    <VerifiedIcon />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(task)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={true}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={value} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </CardContent>
    </Card>
  );
}
