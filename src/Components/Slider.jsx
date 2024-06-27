import React from "react";
import Marquee from "react-fast-marquee";
import shadi1 from "../assets/shadi1.png";

export default function Slider() {
  return (
    <>
      <Marquee className="my-2 pb-8 ">
        <div className=" shadow-xl ml-1 flex flex-col text-center p-4 rounded-xl ml-4">
          <img src={shadi1} alt="" className="w-96 rounded " />
          <h1 className="text-xl text-orange-600">abc and pqr</h1>
          <p className="max-w-96">
            I found my match on biyesadi. com on one month.Not yet married
            butgoing steady with him.There cheers to here.Fairy tales....
          </p>
        </div>
        <div className=" shadow-xl ml-1 flex flex-col text-center p-4 rounded-xl ml-4">
          <img src={shadi1} alt="" className="w-96 rounded " />
          <h1 className="text-xl text-orange-600">abc and pqr</h1>
          <p className="max-w-96">
            I found my match on biyesadi. com on one month.Not yet married
            butgoing steady with him.There cheers to here.Fairy tales....
          </p>
        </div>
        <div className=" shadow-xl ml-1 flex flex-col text-center p-4 rounded-xl ml-4">
          <img src={shadi1} alt="" className="w-96 rounded " />
          <h1 className="text-xl text-orange-600">abc and pqr</h1>
          <p className="max-w-96">
            I found my match on biyesadi. com on one month.Not yet married
            butgoing steady with him.There cheers to here.Fairy tales....
          </p>
        </div>
      </Marquee>
    </>
  );
}
