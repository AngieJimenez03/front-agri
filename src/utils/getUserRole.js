// src/utils/getUserRole.js
import jwtDecode from "jwt-decode";

export function getUserRole() {
  try {
    // 1️⃣ Si ya hay rol guardado directamente
    const rol = localStorage.getItem("rol");
    if (rol) return rol.toLowerCase();

    // 2️⃣ Si no hay rol, intentamos decodificar el token
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded?.rol) return decoded.rol.toLowerCase();
    }

    // 3️⃣ Si no hay nada
    return null;
  } catch (err) {
    console.error("Error obteniendo el rol:", err);
    return null;
  }
}
