// src/components/incidents/IncidentStatusBadge.jsx
import React from "react";
import {
  FaExclamationCircle,
  FaHourglassHalf,
  FaCheckCircle,
} from "react-icons/fa";

export default function IncidentStatusBadge({ status }) {
  let config = {
    color: "gray",
    bg: "bg-gray-100",
    text: "text-gray-700",
    border: "border-gray-300",
    label: "Desconocido",
    icon: null,
  };

  switch (status) {
    case "pendiente":
      config = {
        color: "red",
        bg: "bg-red-50",
        text: "text-red-700",
        border: "border-red-300",
        label: "Pendiente",
        icon: <FaExclamationCircle className="text-red-600" />,
      };
      break;
    case "en_revision":
      config = {
        color: "yellow",
        bg: "bg-yellow-50",
        text: "text-yellow-700",
        border: "border-yellow-300",
        label: "En Revisión",
        icon: <FaHourglassHalf className="text-yellow-600" />,
      };
      break;
    case "resuelta":
      config = {
        color: "green",
        bg: "bg-green-50",
        text: "text-green-700",
        border: "border-green-300",
        label: "Resuelta",
        icon: <FaCheckCircle className="text-green-600" />,
      };
      break;
    default:
      break;
  }

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${config.bg} ${config.text} ${config.border}`}
    >
      {config.icon}
      <span>{config.label}</span>
    </div>
  );
}