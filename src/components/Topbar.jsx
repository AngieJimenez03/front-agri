// src/components/Topbar.jsx
export default function Topbar({ nombre = "Usuario", rol = "" }) {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center ml-64">
      <div>
        <h2 className="text-lg font-semibold text-green-700">Panel de control</h2>
        <p className="text-sm text-gray-500">Bienvenido, {nombre}</p>
      </div>
      <div className="text-sm text-gray-600">{rol}</div>
    </header>
  );
}
