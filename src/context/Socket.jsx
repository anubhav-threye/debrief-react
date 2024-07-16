import { createContext, useContext, useEffect, useRef, useState } from "react";

import { socket } from "@/socket";
import { E_SOCKET } from "@/constants";

const SocketContext = createContext({});

export const SocketProvider = ({ children }) => {
  const [isConnected, setConnected] = useState(false);

  // Manage socket data
  const allData = useRef([]);
  const [updateFlag, setUpdateFlag] = useState(false);

  // Socket connection lifecycle
  useEffect(() => {
    const onConnect = () => setConnected(true);
    const onDisconnect = () => setConnected(false);

    socket.on(E_SOCKET.CONNECT, onConnect);
    socket.on(E_SOCKET.DISCONNECT, onDisconnect);
    socket.on(E_SOCKET.MESSAGE_DATA, handleMessage);

    // Socket connection cleanup
    return () => {
      socket.off(E_SOCKET.CONNECT, onConnect);
      socket.off(E_SOCKET.DISCONNECT, onDisconnect);
      socket.off(E_SOCKET.MESSAGE_DATA, handleMessage);
    };
  }, []);

  /**
   * Function to handle the messages received from socket connection
   * @param {[{ id: string, update: string }]} data   Received from the socket
   */
  const handleMessage = (data) => {
    // Store the data into allData reference
    allData.current.push(data);
    // Trigger an state update to allow for reference update detection
    setUpdateFlag((prev) => !prev);
  };

  return (
    <SocketContext.Provider value={{ isConnected, allData, updateFlag }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
