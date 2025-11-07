// src/pages/Dashboard/Users.jsx
import React, { useEffect, useState } from "react";
import UsersList from "../../components/users/UsersList";
import { PlusCircle, Search } from "lucide-react";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  updateUserRole,
} from "../../services/userService";
import UserFormModal from "../../components/users/UserFormModal";

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [rolFiltro, setRolFiltro] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
  const [usuarioActual, setUsuarioActual] = useState(null);

  // 🔄 Cargar usuarios
  const fetchUsuarios = async () => {
    try {
      const data = await getAllUsers();
      setUsuarios(data);
    } catch (error) {
      console.error("❌ Error al obtener usuarios:", error);
    }
  };

  // 🔑 Obtener usuario autenticado (desde el token)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUsuarioActual(JSON.parse(storedUser));
    }
    fetchUsuarios();
  }, []);

  // ➕ Crear / Editar usuario
  const handleSave = async (data) => {
    try {
      if (usuarioEditando) {
        await updateUser(usuarioEditando._id, data);
      } else {
        await createUser(data);
      }
      fetchUsuarios();
      setModalVisible(false);
      setUsuarioEditando(null);
    } catch (error) {
      console.error("❌ Error al guardar usuario:", error);
    }
  };

  // 🗑️ Eliminar usuario
  const handleDelete = async () => {
    try {
      await deleteUser(usuarioAEliminar._id);
      setUsuarioAEliminar(null);
      fetchUsuarios();
    } catch (error) {
      console.error("❌ Error al eliminar usuario:", error);
    }
  };

  // 🔁 Cambiar rol
  const handleChangeRol = async (id, nuevoRol) => {
    try {
      await updateUserRole(id, nuevoRol);
      fetchUsuarios();
    } catch (error) {
      console.error("Error al cambiar rol:", error);
    }
  };

  // 🔍 Filtros (ahora compatible con 'admin')
  const usuariosFiltrados = usuarios.filter((u) => {
    const coincideBusqueda =
      u.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      u.email?.toLowerCase().includes(busqueda.toLowerCase());

    const coincideRol = rolFiltro
      ? u.rol?.toLowerCase() === rolFiltro.toLowerCase()
      : true;

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
            <option value="admin">Administrador</option>
            <option value="supervisor">Supervisor</option>
            <option value="tecnico">Técnico</option>
          </select>
        </div>

        <button
          onClick={() => setModalVisible(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl shadow-md hover:bg-green-700 transition"
        >
          <PlusCircle size={20} /> Agregar Usuario
        </button>
      </div>

      {/* 👥 Lista de usuarios */}
      <UsersList
        usuarios={usuariosFiltrados.map((u) => ({
          ...u,
          nombre:
            usuarioActual && u._id === usuarioActual._id
              ? `${u.nombre} (tú)`
              : u.nombre,
        }))}
        onDelete={(user) => setUsuarioAEliminar(user)}
        onChangeRol={handleChangeRol}
        onEdit={(user) => {
          setUsuarioEditando(user);
          setModalVisible(true);
        }}
      />

      {/* 🧩 Modal de creación/edición */}
      {modalVisible && (
        <UserFormModal
          userToEdit={usuarioEditando}
          onClose={() => {
            setModalVisible(false);
            setUsuarioEditando(null);
          }}
          onSave={handleSave}
        />
      )}

      {/* 🗑️ Modal de eliminación */}
      {usuarioAEliminar && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              ¿Eliminar usuario?
            </h3>
            <p className="text-gray-600 mb-4">
              Se eliminará permanentemente a{" "}
              <span className="font-medium">{usuarioAEliminar.nombre}</span>.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setUsuarioAEliminar(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
