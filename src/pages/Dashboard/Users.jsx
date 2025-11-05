// src/pages/Dashboard/Users.jsx
import React, { useEffect, useState } from "react";
import UsersList from "../../components/users/UsersList";
import { PlusCircle, Search } from "lucide-react";
import axios from "axios";

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [rolFiltro, setRolFiltro] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5100/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsuarios(res.data);
      } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
      }
    };
    fetchUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5100/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const cambiarRol = async (id, nuevoRol) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5100/api/users/${id}`,
        { rol: nuevoRol },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsuarios((prev) =>
        prev.map((u) => (u._id === id ? { ...u, rol: nuevoRol } : u))
      );
    } catch (error) {
      console.error("Error al cambiar rol:", error);
    }
  };

  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideBusqueda =
      u.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email?.toLowerCase().includes(busqueda.toLowerCase());
    const coincideRol = rolFiltro ? u.rol === rolFiltro : true;
    return coincideBusqueda && coincideRol;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* 🔍 Filtros */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex w-full md:w-3/4 gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Buscar por nombre o correo..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2 shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
            />
          </div>
          <select
            value={rolFiltro}
            onChange={(e) => setRolFiltro(e.target.value)}
            className="border border-gray-300 rounded-xl px-3 py-2 shadow-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
          >
            <option value="">Todos los roles</option>
            <option value="Administrador">Administrador</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Técnico">Técnico</option>
            <option value="Operador">Operador</option>
          </select>
        </div>

        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-green-700 transition">
          <PlusCircle size={20} /> Agregar Usuario
        </button>
      </div>

      <UsersList
        usuarios={usuariosFiltrados}
        onDelete={eliminarUsuario}
        onChangeRol={cambiarRol}
      />
    </div>
  );
};

export default Users;
