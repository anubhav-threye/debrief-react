import { socket } from "@/socket";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const onConnect = () => console.log("connected");
    const onDisconnect = () => console.log("disconnected");

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
  }, []);

  return (
    <main className="min-h-screen w-full bg-neutral-800 text-neutral-300">
      Hello!
    </main>
  );
}

export default App;
