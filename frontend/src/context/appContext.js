import { io } from "socket.io-client";
import React from "react";

const SOCKET_URL = `${process.env.REACT_APP_BACKEND_URL}`;


export const socket=io(SOCKET_URL)
export const AppContext = React.createContext();

