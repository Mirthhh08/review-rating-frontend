import React from "react";
import profile from "../assets/profile.jpg";
import { FaStar } from "react-icons/fa6";
import { format } from "date-fns";
const ReviewCard = ({ fullName, review, createdAt, rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={i <= rating ? "text-yellow-500" : "text-gray-300"}
        >
          <FaStar />
        </span>
      );
    }
    return stars;
  };
  const formattedDate = format(new Date(createdAt), "dd-MM-yyyy");
  const formattedTime = format(new Date(createdAt), "HH:mm");

  return (
    <div className="flex gap-4 bg-white p-6 rounded-lg shadow-md max-w-[700px]">
      <div className="flex-shrink-0">
        <img
          src={profile}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>

      <div className="flex flex-col flex-grow ">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-lg font-semibold text-gray-800">{fullName}</p>
            <p className="text-sm text-gray-500">
              {formattedDate} {formattedTime}
            </p>
          </div>
          <div className="flex">{renderStars()}</div>
        </div>
        <p className="mt-4 text-[#494949] text-sm leading-relaxed">{review}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
