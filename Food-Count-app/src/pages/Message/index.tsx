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
    const {receiverId} = useParams();

    const {user} = useAuthStore();

    const userId = user?.id ? Number.parseInt(user.id) : 0;

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
                receiverId: receiverId ? Number.parseInt(receiverId as string) : -1,
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
        <div className="">
           <div>
                <h1>placeholder for recipient</h1>
           </div>
           <div>
               {
                     messages?.map((msg: MessageType) => (
                          <div key={msg.id | 0}>
                            <p>{msg.message}</p>
                          </div>
                        ))
               }
           </div>
            <div>
                <input className="" value={message} onChange={e => setMessage(e.target.value)} type="text" />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Message;