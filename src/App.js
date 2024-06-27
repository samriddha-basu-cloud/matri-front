import React from "react";
import Home from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Matri from "./Pages/Matri";
import AllMatri from "./Pages/AllMatri";
import Test from "./Pages/Test";
import Login from "./Components/auth/login";
import Register from "./Components/auth/register";
import Header from "./Components/header";
import { AuthProvider } from "./context/authContext";
import ChatPage from "./Pages/ChatPage";
import PaymentDetails from "./Pages/PaymentDetails"
import PaymentGateway from "./Pages/PaymentGateway"
import DisplayProfile from "./Pages/DisplayProfile";
import AllChats from "./Pages/AllChats";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/matri" element={<Matri />} />
          <Route path="/all-matri" element={<AllMatri />} />
          <Route path="/profile" element={<Test />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/payment-details" element={<PaymentDetails />} />
          <Route path="/payment-gateway" element={<PaymentGateway />} />
          <Route path="/individualProfile" element={<DisplayProfile />} />
          <Route path="/allChats" element={<AllChats />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
