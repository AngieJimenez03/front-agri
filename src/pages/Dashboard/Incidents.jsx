// src/pages/Dashboard/Incidents.jsx
import { useEffect, useState } from "react";
import { getIncidents } from "../../services/incidentsService";
import IncidentGrid from "../../components/incidents/IncidentGrid";

export default function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getIncidents();
        setIncidents(data);
      } catch (err) {
        console.error("Error al cargar incidencias:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="p-6 text-center text-gray-600">
        Cargando incidencias...
      </div>
    );

  return <IncidentGrid incidents={incidents} />;
}
