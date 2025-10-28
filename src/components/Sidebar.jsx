// src/components/Sidebar.jsx
import { useState, useEffect, useRef } from "react";
import {
  FaTachometerAlt,
  FaTasks,
  FaUsers,
  FaComments,
  FaCog,
  FaLeaf,
  FaMapMarkedAlt,
  FaSignOutAlt,
  FaChevronDown,
  FaExclamationTriangle,
} from "react-icons/fa";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const [usuario, setUsuario] = useState({ nombre: "", rol: "" });
  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // Cargar datos del usuario guardados en localStorage
  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) setUsuario(JSON.parse(data));
  }, []);

  // Cerrar menú si se hace clic afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuAbierto(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Iniciales para el avatar
  const iniciales = usuario.nombre
    ? usuario.nombre
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "US";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  //  Menú dinámico según el rol del usuario 
  const menuPorRol = {
    admin: [
      { name: "Dashboard", icon: <FaTachometerAlt /> },
      { name: "Lotes", icon: <FaMapMarkedAlt /> },
      { name: "Tareas", icon: <FaTasks /> },
      { name: "Incidencias", icon: <FaExclamationTriangle /> },
      { name: "Chat", icon: <FaComments /> },
      { name: "Usuarios", icon: <FaUsers /> },
      { name: "Configuración", icon: <FaCog /> },
    ],
    supervisor: [
      { name: "Dashboard", icon: <FaTachometerAlt /> },
      { name: "Lotes", icon: <FaMapMarkedAlt /> },
      { name: "Tareas", icon: <FaTasks /> },
      { name: "Incidencias", icon: <FaExclamationTriangle /> },
      { name: "Chat", icon: <FaComments /> },
    ],
    tecnico: [
  { name: "Dashboard", icon: <FaTachometerAlt /> },
  { name: "Mis Tareas", icon: <FaTasks /> },
  { name: "Lotes", icon: <FaMapMarkedAlt /> },
  { name: "Incidencias", icon: <FaExclamationTriangle /> },
  { name: "Chat", icon: <FaComments /> },
],
  };

  const menuItems = menuPorRol[usuario.rol] || [];

  return (
    <aside className="sidebar">
  {/* === LOGO === */}
  <div
    className="logo-section"
    style={{
      background: "linear-gradient(135deg, #d1fae5, #86efac, #4ade80)",
      color: "#064e3b", // color de texto que contrasta
      padding: "20px",
      borderRadius: "0 0 12px 12px", // esquinas inferiores redondeadas (opcional)
    }}
  >
    <div className="logo-container" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <FaLeaf size={22} color="#065f46" />
      <div className="logo-text">
        <span className="logo-title" style={{ fontWeight: "700" }}>
          Raízen
        </span>
        <p className="logo-subtitle" style={{ fontSize: "14px" }}>
          Gestión Agrícola
        </p>
      </div>
    </div>
  </div>

      {/* === MENÚ PRINCIPAL === */}
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => setActive(item.name)}
            className={classNames({ active: active === item.name })}
          >
            {item.icon} {item.name}
          </li>
        ))}
      </ul>

      {/* === USUARIO === */}
      <div className="user-section" ref={menuRef}>
        <div
          className="user-info"
          onClick={() => setMenuAbierto((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <div className="user-avatar">{iniciales}</div>
          <div>
            <div className="user-name">{usuario.nombre || "Usuario"}</div>
            <div className="user-role">
              {usuario.rol
                ? usuario.rol.charAt(0).toUpperCase() + usuario.rol.slice(1)
                : "Rol"}
            </div>
          </div>
          <FaChevronDown
            size={14}
            style={{ marginLeft: "auto", color: "#4b5563" }}
          />
        </div>

        {menuAbierto && (
          <div className="user-menu">
            <button
              onClick={handleLogout}
              style={{ color: "red", fontWeight: "500" }}
            >
              <FaSignOutAlt style={{ marginRight: "8px" }} /> Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
