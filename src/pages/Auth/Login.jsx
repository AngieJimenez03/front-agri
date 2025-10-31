import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authService";
import { Loader2, Eye, EyeOff, Mail } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import AuthLayout from "../../layouts/AuthLayout";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", clave: "" });
  const [loading, setLoading] = useState(false);
  const [mostrarClave, setMostrarClave] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const data = await loginUser(form.email, form.clave);

    // Guardar token
    if (data?.token) {
      localStorage.setItem("token", data.token);
    }

    // Guardar usuario
    if (data?.usuario) {
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // Guardar también el rol para usar en el dashboard
      if (data.usuario.rol) {
        localStorage.setItem("rol", data.usuario.rol.toLowerCase());
      }
    }

    toast.success(`Bienvenido`, { duration: 1200, position: "top-center" });

    setTimeout(() => navigate("/dashboard"), 1200);
  } catch (err) {
    toast.error(err.message || "Credenciales incorrectas", {
      duration: 2500,
      position: "top-center",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <AuthLayout>
      <Toaster />
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-md transform hover:scale-105 transition duration-500">
        <div className="text-center mb-6">
          <div className="bg-green-500 inline-block p-4 rounded-full shadow-md mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke="white" className="w-8 h-8">
              <path d="M12 2.25a9.75 9.75 0 019.75 9.75 9.75 9.75 0 11-9.75-9.75z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-green-700">Inicia sesión</h2>
          <p className="text-gray-500 text-sm">Bienvenido nuevamente a Raízen, el sistema de gestión agrícola</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo correo */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <Mail className="absolute left-3 top-3.5 text-green-500 w-5 h-5" />
          </div>

          {/* Campo contraseña */}
          <div className="relative">
            <input
              type={mostrarClave ? "text" : "password"}
              name="clave"
              placeholder="Contraseña"
              value={form.clave}
              onChange={handleChange}
              className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button
              type="button"
              onClick={() => setMostrarClave((prev) => !prev)}
              className="absolute right-3 top-3.5 text-green-500 hover:text-green-600"
            >
              {mostrarClave ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Enlace "Olvidaste tu contraseña" */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-green-700 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition-transform hover:scale-105 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Entrar"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-green-700 font-semibold hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
