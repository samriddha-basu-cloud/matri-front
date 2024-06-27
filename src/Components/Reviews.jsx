import React from "react";
import Slider from "./Slider";

export default function Reviews() {
  return (
    <div className="flex flex-col lg:flex-row px-5 md:px-20 lg:px-40 py-10 md:py-20">
      <div className="left lg:basis-2/3 border-r-0 lg:border-r-4 border-cyan-500 rounded-lg px-5 mb-10 lg:mb-0">
        <Slider />
        <button className="flex justify-center text-center bg-cyan-600 text-lg md:text-2xl w-full py-3 rounded text-white hover:shadow-xl duration-300">
          View All
        </button>
      </div>
      <div className="right lg:basis-1/3 lg:pl-20">
        <div className="info flex flex-col text-center lg:text-left">
          <span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Matrimonial service
          </span>
          <span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-orange-500">
            with Millions
          </span>
          <span className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            of success stories....
          </span>
        </div>
      </div>
    </div>
  );
}
