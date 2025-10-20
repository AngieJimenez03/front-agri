import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/Dashboard/Overview";
import Usuarios from "./pages/Dashboard/Users";
import Tareas from "./pages/Dashboard/Tasks";
import Lotes from "./pages/Dashboard/Lots";
import ChatPanel from "./components/ChatPanel"; 
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Overview />} />
          <Route path="usuarios" element={<Usuarios />} />
          <Route path="tareas" element={<Tareas />} />
          <Route path="lotes" element={<Lotes />} /> {}
          <Route path="chat" element={<ChatPanel />} /> {}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
