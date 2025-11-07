// src/components/messages/ChatHeader.jsx
export default function ChatHeader({ loteId }) {
  const lotesInfo = {
    lote1: { nombre: "Lote Norte A", cultivo: "Maíz", miembros: 4 },
    lote2: { nombre: "Lote Sur B", cultivo: "Trigo", miembros: 3 },
    lote3: { nombre: "Lote Este C", cultivo: "Soya", miembros: 2 },
  };

  const lote = lotesInfo[loteId] || lotesInfo.lote1;

  return (
    <div className="border-b p-4 bg-white flex justify-between items-center">
      <div>
        <h2 className="font-semibold">{lote.nombre}</h2>
        <p className="text-sm text-gray-500">{lote.cultivo} • {lote.miembros} participantes activos</p>
      </div>
    </div>
  );
}
