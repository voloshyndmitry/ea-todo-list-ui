import React, { useCallback, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Stack from "@mui/material/Stack";

import TaskManager from "./components/TaskManager/TaskManager";
import DeleteAllButton from "./components/DeleteAllButton/DeleteAllButton";
import Login from "./components/Login/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loggedIn = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Stack spacing={2} direction="row">
          <img src={logo} className="App-logo" alt="logo" />
          <h3>Marvelous v2.0</h3>
        </Stack>
        <DeleteAllButton isLoggedIn={isLoggedIn} />
      </header>
      <main>
        <Login onLogin={loggedIn} />
        <TaskManager isLoggedIn={isLoggedIn} />
      </main>
    </div>
  );
}

export default App;
