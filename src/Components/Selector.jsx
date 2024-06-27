import React from "react";
import { useNavigate } from "react-router-dom";
import shadi2 from "../assets/shadi2.png";

export default function Reviews() {
  const navigate = useNavigate();

  return (
    <>
      <div className = "w-full flex flex-col sm:flex-row px-5 md:px-20 py-10 md:py-20 bg-orange-100" >
        <div className="left w-full md:w-2/3 border-r-0 md:border-r-4 border-orange-500 px-10 py-10">
          <div className="info flex flex-col text-center md:text-left items-center">
            <span className="text-4xl md:text-7xl text-cyan-500">
              Search by Different Aspects
            </span>
            <img
              src={shadi2}
              alt="shadi2"
              className="w-full h-auto mt-10 rounded-lg"
            />
          </div>
        </div>
        <div className="right w-full md:w-2/3 px-5 md:px-10">
          <div className="section">
            <h1 className="text-3xl md:text-5xl py-3">By Area</h1>
            <div className="buttons flex flex-wrap gap-3 md:gap-5 py-3 border-t-2 border-cyan-400 border-dotted">
              <button
                className="w-full md:w-2/5 bg-white text-xl md:text-3xl px-3 py-2 rounded hover:shadow-xl duration-300"
              >
                Bundelkhand
              </button>
              <button
                className="w-full md:w-1/5 bg-white text-xl md:text-3xl px-3 py-2 rounded hover:shadow-xl duration-300"
              >
                Malwa
              </button>
              <button
                className="w-full md:w-1/5 bg-white text-xl md:text-3xl px-3 py-2 rounded hover:shadow-xl duration-300"
              >
                Doaba
              </button>
              {/* <button
                className="w-full md:w-2/5 bg-cyan-600 text-white text-xl md:text-3xl px-3 py-2 rounded hover:shadow-xl duration-300"
              >
                More Matrimonials
              </button> */}
            </div>
          </div>
          <div className="section">
            <h1 className="text-3xl md:text-5xl py-3 mt-24">By Caste</h1>
            <div className="buttons flex flex-wrap gap-3 md:gap-5 py-3 border-t-2 border-cyan-400 border-dotted">
              <button
                
                className="w-full md:w-1/5 bg-white text-xl md:text-3xl px-3 py-2 rounded hover:shadow-xl duration-300"
              >
                Yadav 1
              </button>
              <button
                className="w-full md:w-1/5 bg-white text-xl md:text-3xl px-3 py-2 rounded hover:shadow-xl duration-300"
              >
                Yadav 2
              </button>
              <button
                className="w-full md:w-2/5 bg-white text-xl md:text-3xl px-3 py-2 rounded hover:shadow-xl duration-300"
              >
                Yadav 3
              </button>
              {/* <button
                className="w-full md:w-2/5 bg-cyan-600 text-white text-xl md:text-3xl px-3 py-2 rounded hover:shadow-xl duration-300"
              >
                More Matrimonials
              </button> */}
            </div>
          </div>
          <div className="section">
            <h1 className="text-3xl md:text-5xl py-3 mt-24">By Profession</h1>
            <div className="buttons flex flex-wrap gap-3 md:gap-5 py-3 border-t-2 border-cyan-400 border-dotted">
              <button
                className="w-full md:w-1/5 bg-white text-xl md:text-3xl px-3 py-2 rounded hover:shadow-xl duration-300"
              >
                Pilot
              </button>
              <button
                className="w-full md:w-2/5 bg-white text-xl md:text-3xl px-3 py-2 rounded hover:shadow-xl duration-300"
              >
                Teacher
              </button>
              <button
                className="w-full md:w-1/5 bg-white text-xl md:text-3xl px-3 py-2 rounded hover:shadow-xl duration-300"
              >
                Doctor
              </button>
              {/* <button
                className="w-full md:w-2/5 bg-cyan-600 text-white text-xl md:text-3xl px-3 py-2 rounded hover:shadow-xl duration-300"
              >
                More Matrimonials
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
