import React, { useState, useEffect } from "react";
import { auth, firestore } from "../firebase/Firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import Chat from "../Components/Chat"; // Import the Chat component

function AllChats() {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const q = query(
          collection(firestore, "conversations"),
          where("participants", "array-contains", currentUser.uid)
        );

        const unsubscribeChats = onSnapshot(q, (snapshot) => {
          const chatList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setChats(chatList);
        });

        return () => unsubscribeChats();
      }
    });

    return () => unsubscribe();
  }, []);

  const getOtherParticipantName = async (participants) => {
    const otherParticipantId = participants.find((p) => p !== user.uid);
    try {
      const userDoc = await getDoc(doc(firestore, "users", otherParticipantId));
      if (userDoc.exists()) {
        return userDoc.data().name;
      } else {
        return "Unknown User";
      }
    } catch (error) {
      console.error("Error fetching user name:", error);
      return "Error";
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl text-gray-600">
          Please log in to view your chats.
        </p>
      </div>
    );
  }

  //   console.log(selectedChat.participants);

  const handleChatSelect = (chat) => {
    const recipientId = chat.participants.find((p) => p !== user.uid);
    setSelectedChat({ uid: recipientId, chatId: chat.id });
  };

  if (selectedChat) {
    return (
      <div className="mt-20">
        <Chat uid={selectedChat.uid} chatId={selectedChat.chatId} />
      </div>
    );
  }

  //   if (selectedChat) {
  //     console.log(
  //       "yala buga",
  //       selectedChat.participants.find((p) => p !== user.uid)
  //     );
  //     const temp = selectedChat.participants.find((p) => p !== user.uid);
  //     console.log(temp);
  //     return <Chat uid={temp} />;
  //     // return <div>{selectedChat.participants.find((p) => p !== user.uid)}</div>;
  //   }

  return (
    <div className="mx-auto bg-gray-100 h-screen flex flex-col">
      <header className = "bg-gradient-to-r from-orange-200 via-[#f49d3f] to-[#f49d3f] px-4 text-white p-4  shadow-md flex justify-center text-center " >
        <h1 className="text-xl font-semibold">All Chats</h1>
      </header>
      <button
        className="absolute top-0 left-0 mt-4 ml-4 bg-cyan-600 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => window.history.back()}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>
      <ul className="flex-grow overflow-y-auto">
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            userId={user.uid}
            getOtherParticipantName={getOtherParticipantName}
            onSelect={() => handleChatSelect(chat)}
          />
        ))}
      </ul>
    </div>
  );
}

function ChatItem({ chat, userId, getOtherParticipantName, onSelect }) {
  const [otherParticipantName, setOtherParticipantName] =
    useState("Loading...");

  useEffect(() => {
    const fetchName = async () => {
      const name = await getOtherParticipantName(chat.participants);
      setOtherParticipantName(name);
    };
    fetchName();
  }, [chat.participants, getOtherParticipantName]);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <li className="bg-white hover:bg-gray-50 cursor-pointer" onClick={onSelect}>
      <div className="flex items-center px-4 py-3 border-b border-gray-200">
        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-[#f43f5e] flex items-center justify-center text-white font-semibold text-xl">
          {getInitials(otherParticipantName)}
        </div>
        <div className="ml-3 flex-grow">
          <p className="text-sm font-medium text-gray-900">
            {otherParticipantName}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {chat.lastMessage ? chat.lastMessage.text : "No messages yet"}
          </p>
        </div>
        {chat.lastMessage && (
          <span className="text-xs text-gray-400">
            {new Date(chat.lastMessage.timestamp?.toDate()).toLocaleTimeString(
              [],
              { hour: "2-digit", minute: "2-digit" }
            )}
          </span>
        )}
      </div>
    </li>
  );
}

export default AllChats;
