import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Users,
  BarChart2,
  Settings,
  HelpCircle,
  LogOut,
  Leaf,
  Sprout, 
  MessageSquareText, 
} from "lucide-react";

export default function Sidebar({ rol }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between fixed left-0 top-0">
      
      <div>
        <div className="flex items-center gap-2 px-6 py-6 border-b border-gray-100">
          <Leaf className="text-green-600 w-6 h-6" />
          <h1 className="text-2xl font-bold text-green-700">Raízen</h1>
        </div>

        
        <nav className="flex flex-col mt-6 px-3 space-y-2">
          <NavItem to="/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
          <NavItem to="/dashboard/tareas" icon={<ClipboardList />} label="Tareas" />

          {(rol === "admin" || rol === "supervisor") && (
            <>
              <NavItem to="/dashboard/tecnicos" icon={<Users />} label="Técnicos" />
              <NavItem to="/dashboard/lotes" icon={<Sprout />} label="Lotes" /> 
            </>
          )}
          

          <NavItem to="/dashboard/chat" icon={<MessageSquareText />} label="Chat" /> 

          {rol === "admin" && (
            <NavItem to="/dashboard/reportes" icon={<BarChart2 />} label="Reportes" />
          )}
        </nav>
      </div>

      
      <div className="px-3 py-6 border-t border-gray-100 space-y-2">
        <NavLink
          className="flex items-center gap-3 w-full text-gray-700 hover:text-green-600 p-2 rounded-lg"
          to="/help"
        >
          <HelpCircle size={18} /> <span>Ayuda y soporte</span>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 w-full text-gray-700 hover:text-green-600 p-2 rounded-lg"
          to="/settings"
        >
          <Settings size={18} /> <span>Configuración</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full text-red-600 hover:text-red-700 font-medium p-2 rounded-lg transition"
        >
          <LogOut size={18} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 w-full p-2 rounded-lg transition ${
          isActive
            ? "bg-green-50 text-green-700 font-semibold"
            : "text-gray-700 hover:bg-gray-100 hover:text-green-600"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
