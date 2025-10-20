
import API from "./api";

export async function getDashboardData() {
  try {
    const res = await API.get("/dashboard"); 
    return res.data;
  } catch (err) {
    console.error("getDashboardData error:", err.response?.data || err.message);
    throw new Error("Error al obtener datos del dashboard");
  }
}
