import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import DonorLayout from "../../components/layout/DonorLayout";

export type ConversationType = {
  userId: number;
  userName: string;
  lastMessage: string;
  lastMessageTime: string;
};

const MessagesList = () => {
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        // Fetch all conversations for the logged-in user
        const res = await axios.get(`${BASE_URL}/messages/conversations`, {
          withCredentials: true,
        });
        setConversations(res.data.data);
      } catch (err) {
        setConversations([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <DonorLayout>
    <div className="w-full max-w-2xl mx-auto bg-white/90 rounded-3xl shadow-2xl border border-white/20 p-6">
      <h1 className="text-2xl font-bold mb-6 text-green-700">Messages</h1>
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : conversations.length === 0 ? (
        <div className="text-center text-gray-400">No conversations yet.</div>
      ) : (
        <ul className="divide-y divide-green-100">
          {conversations.map((conv) => (
            <li
              key={conv.userId}
              className="py-4 flex items-center cursor-pointer hover:bg-green-50 rounded-xl px-2 transition"
              onClick={() => navigate(`/messages/${conv.userId}`)}
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-200 to-emerald-200 flex items-center justify-center text-lg font-bold text-green-700 shadow mr-4">
                {conv.userName.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{conv.userName}</div>
                <div className="text-gray-500 text-sm truncate max-w-xs">{conv.lastMessage}</div>
              </div>
              <div className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                {new Date(conv.lastMessageTime).toLocaleString([], {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
    </DonorLayout>
  );
};

export default MessagesList;
