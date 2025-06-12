import AppRoutes from "./routes/AppRoutes";
import { ReactFlowProvider } from "@xyflow/react";

function App() {
  return (
    <>
      <ReactFlowProvider>
        <p style={{ position: "absolute" }}>MONEY</p>
        <AppRoutes />
      </ReactFlowProvider>
    </>
  );
}

export default App;
