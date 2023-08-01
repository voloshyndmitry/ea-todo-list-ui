import Stack from "@mui/material/Stack";
import { ftruncate } from "fs";
import React from "react";
import DoneList from "./DoneList/DoneList";
import TodoList from "./TodoList/TodoList";
import NewTaskForm from "./NewTaskForm/NewTaskForm";
import SearchForm from "./SearchForm/SearchForm";

function TaskManager({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (!isLoggedIn) {
    return <></>;
  }
  return (
    <Stack
      spacing={2}
      direction="column"
      justifyContent="space-between"
      padding={2}
    >
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <NewTaskForm />
        <SearchForm />
      </Stack>
      <Stack spacing={2} direction="row" justifyContent="space-between">
        <TodoList />
        <DoneList />
      </Stack>
    </Stack>
  );
}

export default TaskManager;
