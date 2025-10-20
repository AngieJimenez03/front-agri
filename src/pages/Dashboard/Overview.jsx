// src/pages/Dashboard/Overview.jsx
import { useEffect, useState } from "react";
import SummaryCards from "../../components/SummaryCards";
import { getDashboardData } from "../../services/dashboardService";
import Spinner from "../../components/Spinner";

export default function Overview() {
  const [data, setData] = useState(null);
  const rol = localStorage.getItem("rol") || "tecnico";

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getDashboardData();
        if (mounted) setData(res);
      } catch (err) {
        console.error(err);
      }
    })();
    return () => (mounted = false);
  }, []);

  if (!data) return <Spinner />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-green-700">Resumen</h1>
      <p className="text-gray-500 mt-1">Aquí tienes un resumen rápido.</p>
      <SummaryCards rol={rol} data={data} />
    </div>
  );
}
