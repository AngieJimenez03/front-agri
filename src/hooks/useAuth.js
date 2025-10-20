
export function useAuth() {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return { token, rol, user };
}
