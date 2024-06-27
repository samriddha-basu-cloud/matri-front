import React from "react";
import Hero2 from "../Components/Hero2";
import Hero3 from "../Components/Hero3";
import Reviews from "../Components/Reviews";
import Selector from "../Components/Selector";
import AboveFooter from "../Components/AboveFooter";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import { useNavigate } from "react-router-dom";
import Header from "../Components/header";
import FriendRequests from "../Components/FriendRequests";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Hero />
        <Hero2 />
        <div className="flex flex-col md:flex-row gap-4 md:gap-10 bg-orange-400 py-5 items-center justify-center text-center">
            <p className="text-white text-3xl md:text-5xl mb-5 md:mb-0">
              Find you perfect partner
            </p>
            <button
              onClick={() => navigate("/all-matri")}
              className="text-white text-2xl md:text-5xl bg-cyan-700 px-5 py-2 rounded-br-xl rounded-tl-xl"
            >
              Explore!
            </button>
          </div>
        <Selector />
        <Reviews />
        <AboveFooter />
      </div>
      <Footer />
    </div>
  );
}
