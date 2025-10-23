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

  // 🟢 Cargar datos del usuario desde localStorage
  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) {
      try {
        setUsuario(JSON.parse(data));
      } catch (error) {
        console.error("Error al leer usuario del localStorage:", error);
      }
    }
  }, []);

  // 🟢 Cerrar menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🟢 Iniciales del avatar
  const iniciales = usuario.nombre
    ? usuario.nombre
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "US";

  // 🟢 Cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: <FaTachometerAlt /> },
    { name: "Lotes", icon: <FaMapMarkedAlt /> },
    { name: "Tareas", icon: <FaTasks /> },
    { name: "Chat", icon: <FaComments /> },
    { name: "Usuarios", icon: <FaUsers /> },
    { name: "Configuración", icon: <FaCog /> },
  ];

  return (
    <aside className="sidebar">
      {/* === LOGO Y NOMBRE DE LA APP === */}
      <div className="logo-section">
        <div className="logo-container">
          <FaLeaf size={22} color="#047857" />
          <div className="logo-text">
            <span className="logo-title">Raízen</span>
            <p className="logo-subtitle">Sistema de Gestión</p>
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

      {/* === SECCIÓN DE USUARIO (INFERIOR) === */}
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
          <FaChevronDown size={14} style={{ marginLeft: "auto", color: "#4b5563" }} />
        </div>

        {/* === MENÚ DESPLEGABLE SOLO CON “CERRAR SESIÓN” === */}
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
