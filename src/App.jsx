import { Viewer, Manager } from "@/components";
import { SocketProvider, CesiumProvider } from "@/context";

function App() {
  return (
    <SocketProvider>
      <CesiumProvider>
        <main className="min-h-screen w-full bg-neutral-800 text-neutral-300">
          <Viewer>
            <Manager />
          </Viewer>

          <section className="w-full h-16">Bar</section>
        </main>
      </CesiumProvider>
    </SocketProvider>
  );
}

export default App;
