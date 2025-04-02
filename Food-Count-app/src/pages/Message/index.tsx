import {RefObject, useEffect, useRef, useState} from "react";
import {io, Socket} from "socket.io-client";
import {API_URL, BASE_URL} from "../../config/api.ts";
import {useParams} from "react-router-dom";
import axios from "axios";

export type MessageType = {
    id: number;
    senderId: number | null;
    receiverId: number;
    message: string;
    createdAt: string;
    senderName?: string;
    receiverName?: string;
}
const Message = () => {
    const socketRef: RefObject<null|Socket> = useRef(null);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [receiverName, setReceiverName] = useState("");
    const [message, setMessage] = useState("");
    const param = useParams();
    const receiverId = Number(param.receiverId);

    const sendMessage = () => {
        socketRef.current?.emit("private-message", {
            receiverId,
            message
        });
        setMessages((prevMessages ): MessageType[] => {
            return [ {
                id: 0,
                senderId: null,
                receiverId,
                message,
                createdAt: new Date().toISOString()
            },...prevMessages,];
        });
        setMessage("");
    }

    // connect to socket
    useEffect(() => {
        socketRef.current = io(BASE_URL, {
            withCredentials: true,
        });

        socketRef.current?.on("private-message", (message: MessageType) => {
            setMessages((prevMessages) => {
                return [message,...prevMessages];
            });
        })

        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        }
    }, []);

    // get messages
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`${API_URL}/messages/${receiverId}`, {
                    withCredentials: true
                });
                const receiverName = await axios.get(`${API_URL}/users/${receiverId}`, {
                    withCredentials: true
                });
                setReceiverName(receiverName.data.data.name);
                setMessages(response.data.data.reverse());
                console.log(response.data.data);
            }
            catch (err) {
                console.log(err);
            }
        })();
    }, [receiverId]);


    return (
        <div className="bg-gray-50 flex-col">
            {/* Header */}
            <div className="bg-white shadow-sm p-4">
                <h1 className="text-2xl font-bold text-gray-800 text-center">
                    {receiverName}
                </h1>
            </div>

            {/* Messages Container */}
            <div className={`flex flex-col-reverse max-h-96 overflow-y-auto p-4 gap-5`}>
                {
                    // reverse the messages array to display the latest message at the bottom
                    messages?.map((msg: MessageType) => (
                    <div className={`flex ${msg.senderId !== receiverId ? "justify-end" : "justify-start"}`} >
                        <div className={`max-w-md p-4 rounded-lg ${
                            msg.senderId !== receiverId
                                ? 'bg-green-500 text-black'
                                : 'bg-white shadow-sm'
                        }`}
                        >
                            {/* Add sender name display */}
                            <div className="mb-1 text-xs font-semibold text-gray-800">
                                {msg.senderId !== receiverId ? "You" : msg.senderName || "Unknown User"}
                            </div>
                            <p className="text-sm text-black">{msg.message}</p>
                            <div className={`m-1 text-xs ${
                                msg.senderId !== receiverId
                                    ? 'text-green-100'
                                    : 'text-gray-500'
                            }`}>
                                {new Date(msg.createdAt).toLocaleString()}
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
                        className="text-black flex-grow px-4 py-2 border border-gray-300 rounded-md
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