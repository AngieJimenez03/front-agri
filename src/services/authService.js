
import API from "./api";

export async function loginUser(email, clave) {
  try {
    const res = await API.post("/users/login", { email, clave });
    const data = res.data;

    if (data.token) {
      localStorage.setItem("token", data.token);
      if (data.rol) localStorage.setItem("rol", data.rol);
      if (data.usuario) localStorage.setItem("user", JSON.stringify(data.usuario));
    }

    return data;
  } catch (err) {
    const message =
      err.response?.data?.error ||
      err.response?.data?.msg ||
      err.message ||
      "Error en login";
    throw new Error(message);
  }
}

export async function registerUser(userData) {
  try {
    const res = await API.post("/users/register", userData);
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.error ||
      err.response?.data?.msg ||
      err.message ||
      "Error en registro";
    throw new Error(message);
  }
}
