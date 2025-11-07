import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function UserFormModal({ userToEdit, onClose, onSave }) {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    clave: "",
    rol: "tecnico",
  });

  useEffect(() => {
    if (userToEdit) setForm(userToEdit);
  }, [userToEdit]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-green-800 font-semibold text-lg">
            {userToEdit ? "Editar Usuario" : "Crear Usuario"}
          </h2>
          <button onClick={onClose}>
            <FiX size={22} className="text-green-700" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre completo"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          />
          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          />
          {!userToEdit && (
            <input
              type="password"
              name="clave"
              placeholder="Contraseña"
              value={form.clave}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          )}
          <select
            name="rol"
            value={form.rol}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="tecnico">Técnico</option>
            <option value="supervisor">Supervisor</option>
            <option value="administrador">Administrador</option>
          </select>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-md transition"
          >
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}
