import DashboardLayout from "../../layouts/DashboardLayout";

export default function Overview() {
  return (
    <DashboardLayout>
      <h2 style={{ color: "#14532d", fontSize: "1.25rem", fontWeight: "600" }}>
        Bienvenido al Panel de Control
      </h2>
      <p style={{ color: "#6b7280" }}>Aquí irá el resumen general del sistema.</p>
    </DashboardLayout>
  );
}
