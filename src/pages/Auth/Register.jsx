import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import AuthLayout from "../../layouts/AuthLayout";
import { FaLeaf } from "react-icons/fa";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    clave: "",
    confirmarClave: "",
  });
  const [mostrarClave, setMostrarClave] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.clave !== formData.confirmarClave) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      await registerUser(formData);
      toast.success("Registro exitoso");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      toast.error(err.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Toaster />
      <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-8 w-full max-w-md transform hover:scale-105 transition duration-500">
        <div className="text-center mb-6">
          <div className="inline-block p-4 mb-4 bg-green-100 rounded-full shadow-md">
  <FaLeaf className="w-8 h-8 text-green-600" />
</div>
          <h2 className="text-3xl font-bold text-green-700">Crea tu cuenta</h2>
          <p className="text-gray-500 text-sm">Bienvenido a Raízen, un sistema de gestión agrícola</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["nombre", "email", "telefono"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={
                field === "nombre"
                  ? "Nombre completo"
                  : field === "email"
                  ? "Correo electrónico"
                  : "Teléfono"
              }
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required={field !== "telefono"}
            />
          ))}

          {/* Campo contraseña */}
          <div className="relative">
            <input
              type={mostrarClave ? "text" : "password"}
              name="clave"
              placeholder="Contraseña"
              value={formData.clave}
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

          {/* Confirmar contraseña */}
          <div className="relative">
            <input
              type={mostrarConfirmar ? "text" : "password"}
              name="confirmarClave"
              placeholder="Confirmar contraseña"
              value={formData.confirmarClave}
              onChange={handleChange}
              className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button
              type="button"
              onClick={() => setMostrarConfirmar((prev) => !prev)}
              className="absolute right-3 top-3.5 text-green-500 hover:text-green-600"
            >
              {mostrarConfirmar ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition-transform hover:scale-105 flex items-center justify-center"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Registrarse"}
          </button>

          <p className="text-center text-sm mt-6">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-green-700 font-semibold hover:underline">
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}
