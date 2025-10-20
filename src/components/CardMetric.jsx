// src/components/CardMetric.jsx
export default function CardMetric({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:scale-105 transition">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-3xl font-bold text-green-700 mt-2">{value}</p>
    </div>
  );
}
