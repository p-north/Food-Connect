import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";



// a message notification dropdown component

const mockNotifications = [
    { id: 1, text: "You have a new message" },
    { id: 2, text: "Your order has been shipped" },
    { id: 3, text: "Reminder: Meeting at 3 PM" },
];

export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
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

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="relative">
                <Bell className="w-6 h-6 text-gray-700" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {mockNotifications.length}
        </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-2 font-semibold border-b">Notifications</div>
                    <ul className="max-h-60 overflow-y-auto">
                        {mockNotifications.length === 0 ? (
                            <li className="p-4 text-sm text-gray-500">No new notifications</li>
                        ) : (
                            mockNotifications.map((notif) => (
                                <li key={notif.id} className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                                    {notif.text}
                                </li>
                            ))
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}