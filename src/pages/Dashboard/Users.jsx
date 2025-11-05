// src/pages/Dashboard/Users.jsx
import React, { useEffect, useState } from "react";
import UsersList from "../../components/users/UsersList";
import UserFormModal from "../../components/users/UserFormModal";
import { PlusCircle, Search } from "lucide-react";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserRole,
} from "../../services/userService";

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [rolFiltro, setRolFiltro] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);

  const cargarUsuarios = async () => {
    try {
      const data = await getAllUsers();
      setUsuarios(data);
    } catch (error) {
      console.error("❌ Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // ✅ Crear o editar
  const handleSaveUser = async (formData) => {
    try {
      if (userToEdit) {
        await updateUser(userToEdit._id, formData);
      } else {
        await createUser(formData);
      }
      await cargarUsuarios();
      setShowModal(false);
      setUserToEdit(null);
    } catch (error) {
      console.error("❌ Error al guardar usuario:", error);
      alert("Error al guardar usuario");
    }
  };

  const handleEdit = (usuario) => {
    setUserToEdit(usuario);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    try {
      await deleteUser(id);
      setUsuarios((prev) => prev.filter((u) => u._id !== id));
    } catch (error) {
      console.error("❌ Error al eliminar:", error);
      alert("Error al eliminar usuario");
    }
  };

  // ✅ Cambiar Rol
  const handleChangeRol = async (id, nuevoRol) => {
    try {
      await updateUserRole(id, nuevoRol);
      setUsuarios((prev) =>
        prev.map((u) => (u._id === id ? { ...u, rol: nuevoRol } : u))
      );
    } catch (error) {
      console.error("❌ Error al cambiar rol:", error);
      alert("Error al cambiar el rol");
    }
  };

  // 🔍 Filtrado
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
            <option value="administrador">Administrador</option>
            <option value="supervisor">Supervisor</option>
            <option value="tecnico">Técnico</option>
          </select>
        </div>

        <button
          onClick={() => {
            setUserToEdit(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-green-700 transition"
        >
          <PlusCircle size={20} /> Agregar Usuario
        </button>
      </div>

      <UsersList
        usuarios={usuariosFiltrados}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onChangeRol={handleChangeRol}
      />

      {showModal && (
        <UserFormModal
          userToEdit={userToEdit}
          onClose={() => setShowModal(false)}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default Users;
