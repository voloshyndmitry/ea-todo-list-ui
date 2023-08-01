import { io } from "socket.io-client";

const URL = "ea-todo-list-api-6751d356280b.herokuapp.com";
export const socket = io(`wss://${URL}`, { transports: ["websocket"] });
