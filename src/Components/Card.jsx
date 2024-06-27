import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import { FaUser } from "react-icons/fa"; // Import FaUser
import { useNavigate } from "react-router-dom";

export default function Card(props) {
  const navigate = useNavigate();
  const hasImage = props.photos && props.photos.length > 0 && props.photos[0];

  return (
    <>
      <div
        className="bg-slate-100 p-4 rounded-xl relative"
        onClick={() => navigate("/individualProfile", { state: { props } })}
      >
        <div className="relative">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none hover:opacity-75 lg:h-80 flex items-center justify-center">
            {hasImage ? (
              <img
                src={props.photos[0]}
                alt="User has not set any image"
                className="object-cover object-center lg:h-full lg:w-full"
              />
            ) : (
              <FaUser className="text-gray-500 text-6xl" /> // Display FaUser if no image
            )}
            <h3 className="text-sm absolute bottom-14 left-2 bg-gray-200 px-2 py-1 rounded-full">
              <a href="#" aria-hidden="true">
                {props.name}
              </a>
            </h3>
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <p className="mt-1 text-sm text-gray-500">{props.prof}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{props.sex}</p>
          </div>
        </div>
      </div>
    </>
  );
}
