import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { doSignOut } from "../../firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import logo from "../../assets/Logo.png";

import {
  getFirestore,
  query,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";

// Import Notification and User icons as images
import NotificationIcon from "../../assets/notification.png";
import UserIcon from "../../assets/user.png";
import Pricing from "../../assets/Pricing.png";
import FriendRequests from "../FriendRequests";
import { BsChatDots } from "react-icons/bs";


const Header = () => {
  const navigate = useNavigate();
  const [loggedUser, setLoggedUser] = useState("");
  const { userLoggedIn } = useAuth();
  const auth = getAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [incomingRequests, setIncomingRequests] = useState([]);

  useEffect(() => {
    if (userLoggedIn && auth.currentUser) {
      const firestore = getFirestore();
      const currentUserId = auth.currentUser.uid;

      const incomingRequestsQuery = query(
        collection(firestore, "friendRequests"),
        where("recipientId", "==", currentUserId),
        where("status", "==", "pending")
      );

      const getUserLoggedIn = onAuthStateChanged(auth, (user) => {
        if (user) {
          const email = user.email;
          console.log("User email:", email);
          setLoggedUser(email.split("@")[0]);
        } else {
          console.log("User is signed out");
        }
      });

      const unsubscribe = onSnapshot(incomingRequestsQuery, (querySnapshot) => {
        const requests = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setIncomingRequests(requests);
      });

      return () => unsubscribe();
      return () => getUserLoggedIn();
    }
  }, [userLoggedIn, auth]);

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <nav className = "flex justify-between items-center w-full z-20 fixed top-0 left-0 h-14 bg-gradient-to-r from-orange-200 via-[#f49d3f] to-[#f49d3f] px-4" >
        <div className="flex items-center gap-4">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-3xl font-bold text-white transition-all duration-1000 ease-in-out px-4 py-2 rounded-lg hover:text-4xl">
              <img className="mx-auto h-14 w-auto" src={logo} alt="Logo" />
            </span>
          </div>
        </div>

        {userLoggedIn ? (
          <div className="flex items-center gap-4">
            <Link
              className="text-lg text-white transition ease-in-out px-4 py-2 rounded-lg duration-1000 hover:text-xl"
              to={"/payment-details"}
            >
              <img
                src={Pricing}
                alt="Pricing"
                className="w-6 h-6"
                style={{ verticalAlign: "middle" }}
              />
            </Link>

            <button onClick={() => navigate("/allChats")}>
              <BsChatDots className="w-6 h-6 text-white" />
            </button>

            <button
              className="text-lg text-white transition ease-in-out px-4 py-2 rounded-lg duration-1000 hover:text-xl cursor-pointer relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <img
                src={NotificationIcon}
                alt="Notification Icon"
                className="w-6 h-6"
                style={{ verticalAlign: "middle" }}
              />
              {incomingRequests.length > 0 && (
                <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
              )}
            </button>

            <div className="relative">
              <button
                className="text-lg text-white transition ease-in-out px-4 py-2 rounded-lg duration-1000 hover:text-xl cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <img
                  src={UserIcon}
                  alt="User Icon"
                  className="w-6 h-6"
                  style={{ verticalAlign: "middle" }}
                />
              </button>
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  onMouseLeave={handleMouseLeave}
                  className="absolute right-0 mt-2 py-2 bg-white rounded-md shadow-lg w-48"
                >
                  <div
                    div
                    className="block px-4 py-2 text-gray-800 w-full text-center bg-gray-200"
                  >
                    Hi! {loggedUser}
                  </div>

                  <div className="border-t border-gray-200 my-2"></div>
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-center"
                    onClick={() => navigate("/profile")}
                  >
                    Edit Profile
                  </button>
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-center"
                    onClick={() => {
                      doSignOut().then(() => {
                        navigate("/login");
                      });
                    }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              className="text-lg text-white transition ease-in-out px-4 py-2 rounded-lg duration-1000 hover:text-xl cursor-pointer"
              to={"/login"}
            >
              Login
            </Link>
            <Link
              className="text-lg text-white transition ease-in-out px-4 py-2 rounded-lg duration-1000 hover:text-xl cursor-pointer"
              to={"/register"}
            >
              Register New Account
            </Link>
          </div>
        )}
      </nav>
      {showNotifications && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Notifications</h2>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="p-4">
              <FriendRequests />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;