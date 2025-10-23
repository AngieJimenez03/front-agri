import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/dashboard.css";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-main">
        <Topbar />
        <div className="dashboard-content">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}

