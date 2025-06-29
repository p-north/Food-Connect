import { RefObject, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "../../config/api.ts";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DonorLayout from "../../components/layout/DonorLayout";
import RecipientLayout from "../../components/layout/RecipientLayout";
import useAuthStore from "../../store/authStore";

export type MessageType = {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  createdAt: string;
  senderName?: string;
  receiverName?: string;
  isRead: String;
};

const Message = () => {
  const socketRef: RefObject<null | Socket> = useRef(null);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [receiverName, setReceiverName] = useState("");
  const [message, setMessage] = useState("");
  const param = useParams();
  const receiverId = Number(param.receiverId);
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const Layout = user?.accountType === "recipient" ? RecipientLayout : DonorLayout;

  const sendMessage = () => {
    if (!message.trim()) return;
    socketRef.current?.emit("private-message", { receiverId, message });
    setMessages((prevMessages): MessageType[] => [
      {
        id: 0,
        senderId: 0,
        receiverId,
        message,
        isRead,
        createdAt: new Date().toISOString(),
      },
      ...prevMessages,
    ]);
    setMessage("");
  };

  // connect to socket
  useEffect(() => {
    const URL = BASE_URL.split("/api")[0];
    socketRef.current = io(URL, { withCredentials: true });

    socketRef.current?.on("private-message", (message: MessageType) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  // get messages
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${BASE_URL}/messages/${receiverId}`, {
          withCredentials: true,
        });
        console.log("Response", response)
        const receiverNameRes = await axios.get(`${BASE_URL}/users/${receiverId}`, {
          withCredentials: true,
        });
        setReceiverName(receiverNameRes.data.data.name);
        setMessages(response.data.data.reverse());
      } catch (err) {
        setReceiverName("Unknown User");
      }
    })();
  }, [receiverId]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex flex-col">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur-lg border-b border-white/20 shadow-sm flex items-center px-6 py-4">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 rounded-full bg-green-100 hover:bg-green-200 p-2 transition"
            aria-label="Back"
          >
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-200 to-emerald-200 flex items-center justify-center text-lg font-bold text-green-700 shadow">
              {receiverName.charAt(0)}
            </div>
            <h1 className="text-xl font-bold text-gray-800">{receiverName}</h1>
          </div>
        </div>

        {/* Chat Card */}
        <div className="flex-1 flex flex-col items-center justify-center px-2 py-6">
          <div className="w-full max-w-2xl flex flex-col bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 h-full">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto flex flex-col-reverse gap-4 p-6">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 mt-10">No messages yet.</div>
              ) : (
                messages.map((msg: MessageType, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.senderId !== receiverId ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md p-4 rounded-2xl shadow transition-all ${
                        msg.senderId !== receiverId
                          ? "bg-gradient-to-r from-green-500 to-emerald-400 text-white"
                          : "bg-white border border-green-100 text-gray-800"
                      }`}
                    >
                      <div className="mb-1 text-xs font-semibold">
                        {msg.senderId !== receiverId ? "You" : msg.senderName || "Unknown"}
                      </div>
                      <p className="text-base break-words">{msg.message}</p>
                      <div className="mt-1 text-xs text-right text-gray-400">
                        {new Date(msg.createdAt).toLocaleString([], {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Input */}
            <div className="border-t border-white/20 bg-white/80 backdrop-blur-sm p-4 rounded-b-3xl">
              <form
                className="flex gap-3"
                onSubmit={e => {
                  e.preventDefault();
                  sendMessage();
                }}
              >
                <input
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-green-200 focus:ring-2 focus:ring-green-500 bg-white/80 text-gray-800 shadow-sm transition"
                  autoFocus
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 rounded-xl font-semibold shadow-lg text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300"
                >
                  Send
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Message;