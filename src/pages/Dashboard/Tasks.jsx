// src/pages/Dashboard/Usuarios.jsx
import { useEffect, useState } from "react";
import API from "../../services/api";
import Spinner from "../../components/Spinner";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await API.get("/tasks"); // backend: GET /api/users
        if (mounted) setUsuarios(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
    return () => (mounted = false);
  }, []);

  if (!usuarios) return <Spinner />;

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800">Usuarios</h2>
      <div className="mt-4 bg-white p-4 rounded shadow">
        {/* Aquí pones una tabla o lista */}
        {usuarios.length === 0 ? <p>No hay usuarios</p> : (
          <ul>
            {usuarios.map(u => <li key={u._id}>{u.nombre} — {u.email}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}
