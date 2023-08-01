import { Button, Stack, TextField } from "@mui/material";
import React, { ChangeEvent, useCallback, useState } from "react";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [login, setLogin] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(true);

  const onChangeLogin = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  }, []);

  const onChangePass = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  }, []);
  const tryLoggedIn = useCallback(async () => {
    const data = await fetch(
      `https://ea-todo-list-api-6751d356280b.herokuapp.com/auth/login?login=${login.toLocaleLowerCase()}&pass=${pass.toLocaleLowerCase()}`
    ).then((e) => e.json());

    if (data?.token) {
      onLogin();
      setShow(false);
    }
  }, [login, pass]);
  if (!show) {
    return <></>;
  }
  return (
    <Stack
      spacing={2}
      direction="row"
      justifyContent="space-around"
      padding={2}
    >
      <Stack
        spacing={2}
        direction="column"
        justifyContent="space-around"
        paddingTop={5}
      >
        <TextField id="login" label="Login" onChange={onChangeLogin} />
        <TextField
          id="pass"
          label="Pass"
          type="password"
          onChange={onChangePass}
        />
        <Button variant="contained" onClick={tryLoggedIn}>
          Login
        </Button>
      </Stack>
    </Stack>
  );
}
