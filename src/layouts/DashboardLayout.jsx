import { Outlet } from "react-router-dom";
import Sidebar from "@/components/navigation/Sidebar";
import Topbar from "@/components/navigation/Topbar";
import "@/styles/dashboard.css";

export default function DashboardLayout() {
  return (
    <div className="dashboard-wrapper">
      {/* 📌 Sidebar siempre visible */}
      <Sidebar />

      {/* 📌 Contenedor principal */}
      <div className="dashboard-main">
        <Topbar /> {/* ← cambia dinámicamente según la ruta */}
        <main className="dashboard-content">
          <Outlet /> {/* ← aquí se cargan las páginas (Lotes, Tareas, etc.) */}
        </main>
      </div>
    </div>
  );
}

