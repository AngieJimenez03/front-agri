// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SocketProvider } from "./context/SocketContext"; // ✅ Importa el contexto del socket

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/Dashboard/Overview";
import Usuarios from "./pages/Dashboard/Users";
import Tareas from "./pages/Dashboard/Tasks";
import Lotes from "./pages/Dashboard/Lots";
import ChatPage from "./pages/Dashboard/chat"; 
// import ChatPanel from "./components/messages/ChatPanel";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Incidencias from "./pages/Dashboard/Incidents"; // 👈 nombre cambiado a Incidencias

export default function App() {
  return (
    <BrowserRouter>
      {/* Envolvemos toda la app dentro del SocketProvider */}
      <SocketProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="lotes" element={<Lotes />} />
            <Route path="tareas" element={<Tareas />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="chat" element={<ChatPage />} />
            {/* 👇 Ruta ajustada para coincidir con el Sidebar */}
            <Route path="incidencias" element={<Incidencias />} />
          </Route>
        </Routes>
      </SocketProvider>
    </BrowserRouter>
  );
}