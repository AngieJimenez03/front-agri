// src/components/users/UserCard.jsx
import React from "react";
import { Pencil, Trash2, Mail, Phone, UserCog } from "lucide-react";

const UserCard = ({ usuario, onDelete, onChangeRol }) => {
  if (!usuario) return null;

  const iniciales = usuario.nombre
    ? usuario.nombre
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all">
      {/* 🧑 Izquierda: avatar + info */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-700 text-white font-semibold text-sm">
          {iniciales}
        </div>

        {/* Info usuario */}
        <div>
          <h3 className="font-semibold text-gray-800 text-base">{usuario.nombre}</h3>

          <div className="flex items-center flex-wrap gap-x-5 text-sm text-gray-500 mt-1">
            {/* Correo */}
            <div className="flex items-center gap-1.5">
              <Mail size={14} strokeWidth={1.5} className="text-gray-400" />
              <span>{usuario.email}</span>
            </div>

            {/* Teléfono */}
            <div className="flex items-center gap-1.5">
              <Phone size={14} strokeWidth={1.5} className="text-gray-400" />
              <span>{usuario.telefono}</span>
            </div>

            {/* Rol con icono */}
            <div className="flex items-center gap-1.5">
              <UserCog size={14} strokeWidth={1.5} className="text-gray-400" />
              <span className="text-gray-700">{usuario.rol}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ⚙️ Derecha: acciones */}
      <div className="flex items-center gap-5">
        <select
          value={usuario.rol}
          onChange={(e) => onChangeRol(usuario._id, e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-green-600 focus:outline-none"
        >
          <option value="Administrador">Administrador</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Técnico">Técnico</option>
        </select>

        <div className="flex gap-2">
          <button
            className="p-1.5 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-gray-100 transition"
            title="Editar"
          >
            <Pencil size={18} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => onDelete(usuario._id)}
            className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg hover:bg-gray-100 transition"
            title="Eliminar"
          >
            <Trash2 size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
