// // src/components/ProcessCard.jsx
// import StatusBadge from "./StatusBadge";

// export default function ProcessCard({ process }) {
//   const { name, status, assignedTo, progress } = process;

//   return (
//     <div className="border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 bg-gradient-to-br from-gray-50 to-white">
//       {/* Cabecera */}
//       <div className="flex justify-between items-center mb-2">
//         <h3 className="font-semibold text-gray-800">{name}</h3>
//         <StatusBadge status={status} />
//       </div>

//       {/* Información */}
//       <p className="text-sm text-gray-500 mb-2">
//         <span className="font-medium text-gray-600">Técnico:</span> {assignedTo}
//       </p>

//       {/* Barra de progreso */}
//       <div className="mt-2">
//         <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
//           <div
//             className={`h-2.5 rounded-full transition-all duration-500 ${
//               progress === 100 ? "bg-green-500" : "bg-blue-500"
//             }`}
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
//         <p className="text-xs text-gray-400 mt-1">{progress}% completado</p>
//       </div>
//     </div>
//   );
// }
