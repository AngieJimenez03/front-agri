//src/pages/Dashboard/chat.jsx
import ChatPanel from "@/components/messages/ChatPanel";
import ChatLote from "@/components/messages/ChatLot";
import { useState } from "react";

export default function ChatPage() {
  const [selectedLote, setSelectedLote] = useState("lote1");

  return (
    <div className="flex h-[85vh] bg-gray-50 rounded-2xl shadow-lg overflow-hidden">
      <ChatPanel onSelectLote={setSelectedLote} selectedLote={selectedLote} />
      <ChatLote loteId={selectedLote} />
    </div>
  );
}
