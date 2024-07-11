import { useEffect } from "react";

import { socket } from "@/socket";
import { Viewer } from "@/components";

function App() {
  // Socket connection lifecycle
  useEffect(() => {
    const onConnect = () => console.log("connected");
    const onDisconnect = () => console.log("disconnected");

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // Socket connection cleanup
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
  }, []);

  return (
    <main className="min-h-screen w-full bg-neutral-800 text-neutral-300">
      <Viewer />
    </main>
  );
}

export default App;
