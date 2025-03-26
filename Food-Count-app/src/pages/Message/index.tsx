import {useState} from "react";
import {io} from "socket.io-client";
import {BASE_URL} from "../../config/api.ts";
import {useParams} from "react-router-dom";

function getToken() {
    // Split the document.cookie string by ';' to get each cookie
    const cookies = document.cookie.split(';');

    // Loop through each cookie to find the one you're looking for
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim(); // Remove leading and trailing spaces
        if (cookie.startsWith('token=')) {
            return cookie.substring('token='.length, cookie.length); // Return the value of the token
        }
    }

    // Return null if token is not found
    return null;
}

const Message = () => {
    const [message, setMessage] = useState("");
    const {receiverId} = useParams();

    const socket = io(BASE_URL, {
        query: {
            token: getToken() || "",
        }
    });

    const sendMessage = () => {
        socket.emit("private-message", {
            receiverId,
            message
        });
    }

    return (
        <div className="">
           <div>
                <h1>placeholder for recipient</h1>
           </div>
           <div >

           </div>
            <div>
                <input className="" onChange={e => setMessage(e.target.value)} type="text" />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Message;