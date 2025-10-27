// src/components/ActiveProcesses.jsx
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  PauseCircle,
} from "lucide-react";

export default function ActiveProcesses({ processes = [] }) {
  const statusConfig = {
    pendiente: {
      icon: <PauseCircle className="w-4 h-4 text-gray-500" />,
      color: "bg-gray-100 text-gray-600 border-gray-200",
      bar: "bg-gray-400",
    },
    "en_proceso": {
      icon: <Clock className="w-4 h-4 text-blue-500" />,
      color: "bg-blue-100 text-blue-600 border-blue-200",
      bar: "bg-blue-500",
    },
    completada: {
      icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
      color: "bg-green-100 text-green-600 border-green-200",
      bar: "bg-green-500",
    },
    retrasada: {
      icon: <AlertCircle className="w-4 h-4 text-yellow-500" />,
      color: "bg-yellow-100 text-yellow-700 border-yellow-200",
      bar: "bg-yellow-500",
    },
    cancelada: {
      icon: <XCircle className="w-4 h-4 text-red-500" />,
      color: "bg-red-100 text-red-600 border-red-200",
      bar: "bg-red-500",
    },
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
      <h2 className="text-lg font-semibold mb-5 text-gray-800 flex items-center gap-2">
        <Clock className="w-5 h-5 text-blue-600" />
        Procesos Activos
      </h2>

      {processes.length === 0 ? (
        <p className="text-gray-400 text-sm">
          No hay procesos activos en este rol.
        </p>
      ) : (
        <div className="space-y-4">
          {processes.map((p) => {
            const estado = p.estado?.toLowerCase();
            const style = statusConfig[estado] || statusConfig["pendiente"];

            return (
              <motion.div
                key={p.id}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                }}
                className="p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 flex justify-between items-center"
              >
                <div className="flex-1 pr-4">
                  <h3 className="font-semibold text-gray-800">{p.nombre}</h3>
                  <p className="text-sm text-gray-500">
                    Lote:{" "}
                    <span className="font-medium text-gray-600">{p.lote}</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Progreso: {p.progress || 0}%
                  </p>

                  <div className="mt-3 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.progress || 0}%` }}
                      transition={{ duration: 0.6 }}
                      className={`h-2.5 rounded-full ${style.bar}`}
                    />
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 min-w-[120px]">
                  <span
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${style.color}`}
                  >
                    {style.icon}
                    {p.estado}
                  </span>
                  <button className="text-sm text-blue-600 hover:underline">
                    Ver detalles
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
