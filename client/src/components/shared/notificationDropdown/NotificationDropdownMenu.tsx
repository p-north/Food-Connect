import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import {BASE_URL} from "../../../config/api.ts";
import axios from "axios";
import {MessageType} from "../../../pages/Message";


type Notification = {
    id: number;
    text: string;
    link: string;
}
type UnreadMessages = {
    count: number;
    senderName: string;
    type: string;
    date: Date;
}

export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [newMessages, setNewMessages] = useState<Notification[]>([]);
    const dropdownRef = useRef(null);

    // handle removing the notification from the list
    const handleRemoveNotification = (id: number) => {
        setNewMessages((prev) => prev.filter((item) => item.id !== id));
    };

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !(dropdownRef.current as HTMLElement).contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Fetch new messages
    useEffect(() => {
        // Simulate fetching new messages
        (async () => {
            const { data: {data} } = await axios.get(`${BASE_URL}/messages/unread-messages`, {
                withCredentials: true
            });

            const unreadMessagesData: { [key: number] : UnreadMessages; } = {};

            data.forEach((message: MessageType) => {
                const senderId = message.senderId;
                if (!unreadMessagesData[senderId]) {
                    unreadMessagesData[senderId] = {
                        count: 0,
                        type: "message",
                        date: new Date(message.createdAt),
                        senderName: message.senderName || "Unknown",
                    }
                }
                // check if the message is the latest
                if (unreadMessagesData[senderId].date < new Date(message.createdAt))
                    unreadMessagesData[senderId].date = new Date(message.createdAt);

                unreadMessagesData[senderId].count++;
            });

            // Convert the unreadMessagesData object to an array of notifications and insert into newMessages
            const notifications: Notification[] = Object.entries(unreadMessagesData).map(([key, value]) => ({
                id: Number(key),
                text: `${value.senderName} sent you ${value.count} new messages`,
                link: `/message/${key}`,
            }));
            setNewMessages([...notifications, ...newMessages]);
        })();
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="relative">
                <Bell className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {newMessages.length}
        </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 text-black bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-3">
                    <div className="p-2 font-semibold border-b">Notifications</div>
                    <ul className="max-h-60 overflow-y-auto">
                        {newMessages.length === 0 ? (
                            <li className="p-4 text-sm text-gray-500">No new notifications</li>
                        ) : (
                            newMessages.map((notify) => (
                                <a href={notify.link} key={notify.id}>
                                    <li className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer" onClick={() => {
                                        handleRemoveNotification(notify.id);
                                        setIsOpen(false);
                                    }} >
                                        {notify.text}
                                    </li>
                                </a>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}