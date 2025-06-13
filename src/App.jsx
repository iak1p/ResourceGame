import { DnDProvider } from "./components/DnDContext/DnDContext";
import AppRoutes from "./routes/AppRoutes";
import { ReactFlowProvider } from "@xyflow/react";

function App() {
  return (
    <>
      <ReactFlowProvider>
        <DnDProvider>
          <AppRoutes />
        </DnDProvider>
      </ReactFlowProvider>
    </>
  );
}

export default App;
