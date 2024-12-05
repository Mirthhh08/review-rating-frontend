import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import { format } from "date-fns";

const CompanyDetail = ({
  logo,
  name,
  address,
  reviewsCount,
  rating,
  founded,
  handleChange,
}) => {
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
  const safeDate = founded ? new Date(founded) : new Date("1970-01-01");
  const formattedDate = !isNaN(safeDate.getTime())
    ? format(safeDate, "dd-MM-yyyy")
    : "Unknown";

    
  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 justify-between p-6 shadow-lg w-full  bg-white rounded-lg">
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={logo}
          alt={`${name} Logo`}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      <div className="flex flex-col flex-grow gap-2 lg:items-start items-center">
        <p className="text-lg font-bold truncate">{name}</p>

        <div className="text-sm text-[#767676] flex items-center">
          <IoLocationOutline />
          <p className="truncate ml-1">{address}</p>
        </div>

        <div className="flex items-center gap-2 font-bold">
          <div className="flex items-center gap-1">
            <span>{rating}</span>
            <div className="flex">{renderStars()}</div>
          </div>
          <p className="text-sm text-gray-500">{reviewsCount} Reviews</p>
        </div>
      </div>

      <div className="flex flex-col lg:gap-4 items-center flex-shrink-0">
        <div className="text-sm text-gray-400 truncate">
          Founded On: {formattedDate}
        </div>

        <button
          onClick={handleChange}
          className="bg-gradient-to-r from-[#D100F3] to-[#002BC5] text-white px-2 py-1 rounded-md hover:bg-gray-800 mt-2"
        >
          + Add Review
        </button>
      </div>
    </div>
  );
};

export default CompanyDetail;
