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

export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [newMessages, setNewMessages] = useState<Notification[]>([]);
    const dropdownRef = useRef(null);

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

    useEffect(() => {
        // Simulate fetching new messages
        const fetchMessages = async () => {
            const unreadMessages = await axios.get(`${BASE_URL}/messages/unread-messages`, {
                withCredentials: true
            });

            console.log(unreadMessages);
        }
        fetchMessages();
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
                                <li key={notify.id} className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                                    {notify.text}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}