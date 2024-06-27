import React, { useState, useEffect } from "react";
import { useList } from "react-firebase-hooks/database";
import {
  getDatabase,
  ref,
  push,
  set,
  serverTimestamp,
} from "firebase/database";
import { useAuth } from "../context/authContext";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatRoom = () => {
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = ref(getDatabase(), "messages");
  const [messages, loading, error] = useList(messagesRef);
  const [currentUser, userLoading, userError] = useAuthState(useAuth()); // Use useAuthState hook

  useEffect(() => {
    if (error || userError) {
      console.error("Error fetching messages or user:", error, userError);
      // or display an error message in the UI
    }
  }, [error, userError]);

  const sendMessage = async () => {
    try {
      if (newMessage.trim() && currentUser) {
        const messageRef = push(messagesRef);
        const timestamp = serverTimestamp();

        await set(messageRef, {
          content: newMessage,
          senderId: currentUser.uid, // Use the current user's ID
          timestamp: timestamp,
        });
        setNewMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // or display an error message in the UI
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-y-auto">
        {loading || userLoading ? (
          <div>Loading...</div>
        ) : error || userError ? (
          <div>Error: {error?.message || userError?.message}</div>
        ) : (
          messages &&
          messages.map((message) => (
            <div key={message.key} className="p-2 bg-gray-100 rounded-md mb-2">
              {message.val().content}
            </div>
          ))
        )}
      </div>
      <div className="flex mt-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 border border-gray-300 rounded-l-md"
        />
        <button
          onClick={sendMessage}
          disabled={!currentUser}
          className={`px-4 py-2 text-white rounded-r-md ${
            currentUser ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
