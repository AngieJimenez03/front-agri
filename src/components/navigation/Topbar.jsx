import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { HiOutlineBellAlert } from "react-icons/hi2";
import "../../styles/dashboard.css";

export default function Topbar() {
  const location = useLocation();
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [boton, setBoton] = useState("");

  // 📍 Mapa de rutas → títulos, subtítulos y botones
  const mapRutas = {
    "/dashboard": {
      titulo: "Panel Principal",
      subtitulo: "Resumen general de operaciones agrícolas",
      boton: "Crear usuario",
    },
    "/dashboard/lotes": {
      titulo: "Gestión de Lotes",
      subtitulo: "Control y supervisión de los lotes activos",
      boton: "Crear lote",
    },
    "/dashboard/tareas": {
      titulo: "Gestión de Tareas",
      subtitulo: "Asigna y gestiona tareas del personal técnico",
      boton: "Crear tarea",
    },
    "/dashboard/usuarios": {
      titulo: "Gestión de Usuarios",
      subtitulo: "Administra cuentas y roles del sistema",
      boton: "Crear usuario",
    },
    "/dashboard/incidencias": {
      titulo: "Gestión de Incidencias",
      subtitulo: "Monitoreo y seguimiento de reportes",
      boton: "Nueva incidencia",
    },
    "/dashboard/chat": {
      titulo: "Chat de Lotes",
      subtitulo: "Comunicación directa con el personal de campo",
      boton: "",
    },
    "/dashboard/configuracion": {
      titulo: "Configuración del Sistema",
      subtitulo: "Ajusta las preferencias del usuario",
      boton: "",
    },
  };

  // 📍 Actualiza dinámicamente cuando cambia la ruta
  useEffect(() => {
    console.log("🔄 RUTA ACTUAL:", location.pathname);
    const ruta = mapRutas[location.pathname];
    if (ruta) {
      setTitulo(ruta.titulo);
      setSubtitulo(ruta.subtitulo);
      setBoton(ruta.boton);
    } else {
      setTitulo("Panel");
      setSubtitulo("Bienvenido al sistema");
      setBoton("");
    }
  }, [location.pathname]);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">{titulo}</h1>
        <p className="topbar-subtitle">{subtitulo}</p>
      </div>

      <div className="topbar-right">
        {/* 🔔 Botón de notificaciones */}
        <button className="btn-notificacion">
          <HiOutlineBellAlert className="icono-notificacion" />
        </button>

        {/* ➕ Botón de acción */}
        {boton && (
          <button className="btn-asignar-tarea bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition">
            <FiPlus className="text-white" />
            {boton}
          </button>
        )}
      </div>
    </header>
  );
}
