import AppRoutes from "./routes/AppRoutes";
import { ReactFlowProvider } from "@xyflow/react";

function App() {
  return (
    <>
      <ReactFlowProvider>
        <AppRoutes />
      </ReactFlowProvider>
    </>
  );
}

export default App;
