import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const IncidentForm = ({ onCreate }) => {
  const [descripcion, setDescripcion] = useState("");
  const [tarea, setTarea] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!descripcion || !tarea) return;
    onCreate({ descripcion, tarea });
    setDescripcion("");
    setTarea("");
  };

  return (
    <Card className="max-w-lg mx-auto mt-6 shadow-lg border border-green-200 rounded-2xl bg-white">
      <CardContent className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Reportar nueva incidencia
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Describe el problema..."
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              rows="3"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">
              ID de tarea
            </label>
            <input
              type="text"
              value={tarea}
              onChange={(e) => setTarea(e.target.value)}
              placeholder="Ejemplo: 6543abcde..."
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Registrar incidencia
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default IncidentForm;