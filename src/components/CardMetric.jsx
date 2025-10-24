// src/components/CardMetric.jsx
import { motion } from "framer-motion";

export default function CardMetric({ title, value, Icon, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
    >
      <div>
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
      </div>

      <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-opacity-10 ${color}`}>
        <Icon className={`w-6 h-6 ${color.replace("bg-", "text-")}`} />
      </div>
    </motion.div>
  );
}
