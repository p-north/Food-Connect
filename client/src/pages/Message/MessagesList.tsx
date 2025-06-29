import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import DonorLayout from "../../components/layout/DonorLayout";
import RecipientLayout from "../../components/layout/RecipientLayout";
import useAuthStore from "../../store/authStore";

export type ConversationType = {
  userId: number;
  userName: string;
  createdAt: string;
  message: string;
};

function formatRelativeTime(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = (now.getTime() - date.getTime()) / 1000;
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 172800) return "Yesterday";
  return date.toLocaleDateString();
}

const MessagesList = () => {
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    (async () => {
      try {
        // Fetch all conversations for the logged-in user
        const res = await axios.get(`${BASE_URL}/messages/conversations`, {
          withCredentials: true,
        });
        console.log("Msg List res", res);
        setConversations(res.data.data);
      } catch (err) {
        setConversations([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const Layout = user?.accountType === "recipient" ? RecipientLayout : DonorLayout;

  return (
    <Layout>
      <div className="w-full max-w-2xl mx-auto bg-white/90 rounded-3xl shadow-2xl border border-white/20 p-0">
        <h1 className="text-2xl font-bold mb-4 text-green-700 px-6 pt-6">Messages</h1>
        {loading ? (
          <div className="text-center text-gray-400 py-10">Loading...</div>
        ) : conversations.length === 0 ? (
          <div className="text-center text-gray-400 py-10">No conversations yet.</div>
        ) : (
          <ul className="divide-y divide-green-100">
            {conversations.map((conv) => (
              <li
                key={conv.userId}
                className="flex items-center px-6 py-4 cursor-pointer hover:bg-green-50 transition group rounded-2xl"
                onClick={() => navigate(`/messages/${conv.userId}`)}
                tabIndex={0}
                aria-label={`Open chat with ${conv.userName}`}
              >
                {/* Avatar */}
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-200 to-emerald-200 flex items-center justify-center text-lg font-bold text-green-700 shadow mr-4 border-2 border-green-100 group-hover:scale-105 transition-transform">
                  {conv.userName.charAt(0)}
                </div>
                {/* Conversation Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800 truncate">{conv.userName}</span>
                    <span className="text-xs text-gray-400 ml-2 whitespace-nowrap">
                      {formatRelativeTime(conv.createdAt)}
                    </span>
                  </div>
                  <div className="text-gray-500 text-sm truncate max-w-xs mt-1">{conv.message}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default MessagesList;