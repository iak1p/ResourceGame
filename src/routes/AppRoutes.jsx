import { Route, Routes } from "react-router-dom";
import Main from "../pages/Main/Main";
import Error from "../pages/Error/Error";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/*" element={<Error />} />
    </Routes>
  );
};

export default AppRoutes;
