import { Outlet } from "react-router-dom";
import "./layout.css";

export const Layout = () => {
  return (
    <div className="w100 df fdc aic app-container">
      <Outlet />
    </div>
  );
};
