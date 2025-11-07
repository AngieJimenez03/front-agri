import { useState } from "react";
import { Paperclip, Smile, Send } from "lucide-react";
import EmojiPicker from "emoji-picker-react";

export default function ChatInput({ onSend }) {
  const [mensaje, setMensaje] = useState("");
  const [mostrarEmojis, setMostrarEmojis] = useState(false);
  const [imagen, setImagen] = useState(null);

  const handleSend = () => {
    onSend(mensaje, imagen);
    setMensaje("");
    setImagen(null);
  };

  return (
    <div className="p-3 bg-white relative">
      {mostrarEmojis && (
        <div className="absolute bottom-14 left-4 z-10">
          <EmojiPicker onEmojiClick={(e) => setMensaje(mensaje + e.emoji)} />
        </div>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={() => setMostrarEmojis(!mostrarEmojis)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Smile className="text-gray-600" />
        </button>

        <label className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
          <Paperclip className="text-gray-600" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </label>

        <input
          type="text"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />

        <button
          onClick={handleSend}
          className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>

      {imagen && (
        <div className="mt-2 text-sm text-gray-500">
          Imagen seleccionada: {imagen.name}
        </div>
      )}
    </div>
  );
}
