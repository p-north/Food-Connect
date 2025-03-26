import {RefObject, useEffect, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";
import {API_URL, BASE_URL} from "../../config/api.ts";
import {useParams} from "react-router-dom";
import axios from "axios";
import useAuthStore from "../../store/authStore.ts";

export type MessageType = {
    id: number;
    senderId: number;
    receiverId: number;
    message: string;
    createdAt: string;
}
const Message = () => {
    const socketRef: RefObject<null|Socket> = useRef(null);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [message, setMessage] = useState("");
    const param = useParams();
    const {user} = useAuthStore();

    const userId = user?.id ? Number.parseInt(user.id) : 0;
    const receiverId = Number.parseInt(param.receiverId as string);

    useEffect(() => {
        socketRef.current = io(BASE_URL, {
            withCredentials: true,
        });

        socketRef.current?.on("private-message", (message: MessageType) => {
            setMessages((prevMessages) => {
                return [...prevMessages, message];
            });
        })

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        }
    }, []);

    const sendMessage = () => {
        socketRef.current?.emit("private-message", {
            receiverId,
            message
        });
        setMessages((prevMessages) => {
            return [...prevMessages, {
                id: 0,
                senderId: userId,
                receiverId,
                message,
                createdAt: new Date().toISOString()
            }];
        });
        setMessage("");
    }


    // get messages
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${API_URL}/messages/${receiverId}`, {
                    withCredentials: true
                });
                setMessages(response.data.data);
            }
            catch (err) {
                console.log(err);
            }
        })();
    });


    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            {/* Header */}
            <div className="bg-white shadow-sm p-4">
                <h1 className="text-2xl font-bold text-gray-800 text-center">
                    Messages
                </h1>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages?.map((msg: MessageType) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === currentUser ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-md p-4 rounded-lg ${
                                msg.sender === currentUser
                                    ? 'bg-green-500 text-white'
                                    : 'bg-white shadow-sm'
                            }`}
                        >
                            <p className="text-sm">{msg.message}</p>
                            <div className={`mt-2 text-xs ${
                                msg.sender === currentUser
                                    ? 'text-green-100'
                                    : 'text-gray-500'
                            }`}>
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="border-t bg-white p-4">
                <div className="flex gap-2">
                    <input
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        type="text"
                        placeholder="Type your message..."
                        className="flex-grow px-4 py-2 border border-gray-300 rounded-md
                 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        onClick={sendMessage}
                        className="bg-green-500 text-white px-6 py-2 rounded-md
                 hover:bg-green-600 transition-colors duration-150
                 flex items-center justify-center"
                    >
                        Send
                        <svg
                            className="ml-2 w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Message;