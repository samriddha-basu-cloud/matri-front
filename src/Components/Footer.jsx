import React from "react";
import fb from "../assets/Facebook.png";
import insta from "../assets/Instagram.png";
import twit from "../assets/Twitter.png";
import linked from "../assets/LinkedIn.png";
import { AiOutlineArrowRight } from "react-icons/ai";
import logo from "../assets/Logo.png";

export default function Footer() {
  return (
    <footer className="bg-white w-full">
      <div className="top flex flex-col md:flex-row justify-between px-6 md:px-20 lg:px-40 py-10 items-center">
        <img className="mb-4 md:mb-0 h-14 w-auto" src={logo} alt="Logo" />
        <div className="input flex w-full md:w-auto">
          <input
            type="text"
            placeholder="Subscribe Newsletter"
            className="w-full md:w-auto border border-gray-300 p-2 rounded-l"
          />
          <button className="bg-orange-400 w-10 h-10 flex items-center justify-center rounded-r hover:text-white shadow-xl duration-300 cursor-pointer">
            <AiOutlineArrowRight className="text-white" />
          </button>
        </div>
      </div>
      <div className="anchors flex flex-wrap justify-center md:justify-between px-6 md:px-20 lg:px-40 py-2 space-x-4 md:space-x-0">
        <a href="" className="text-lg md:text-xl mx-2 md:mx-0">
          Terms of Use
        </a>
        <a href="" className="text-lg md:text-xl mx-2 md:mx-0">
          Help
        </a>
        <a href="" className="text-lg md:text-xl mx-2 md:mx-0">
          Contact Us
        </a>
      </div>
      <div className="socials flex justify-center md:justify-between px-6 md:px-20 lg:px-40 py-2 space-x-4 md:space-x-0">
        <img src={fb} alt="" className="bg-slate-300 p-2 rounded" />
        <img src={insta} alt="" className="bg-slate-300 p-2 rounded" />
        <img src={linked} alt="" className="bg-slate-300 p-2 rounded" />
        <img src={twit} alt="" className="bg-slate-300 p-2 rounded" />
      </div>
      <div className="copyright flex justify-center text-center bg-orange-100 py-4">
        <span>Copyrights reserved &copy; Bantu Programmers</span>
      </div>
    </footer>
  );
}
