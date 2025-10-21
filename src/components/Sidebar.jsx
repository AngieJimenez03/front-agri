import { useState } from "react";
import {
  FaTachometerAlt,
  FaTasks,
  FaUsers,
  FaComments,
  FaCog,
  FaLeaf,
  FaMapMarkedAlt,
} from "react-icons/fa";
import classNames from "classnames";
import "../styles/dashboard.css";

export default function Sidebar() {
  const [active, setActive] = useState("Dashboard");

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
      <div className="user-section">
        <div className="user-info">
          <div className="user-avatar">JP</div>
          <div>
            <div className="user-name">Juan Pérez</div>
            <div className="user-role">Administrador</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

