import React from "react";
import { Link } from "react-router-dom";
import icon from "../assets/icon.png";
import textIcon from "../assets/texticon.png";
import search from "../assets/search.png";
const Navbar = () => {
  return (
    <div className="py-5 px-10 flex items-center shadow-lg ">
      <div className="flex items-center gap-2 ">
        <img src={icon} alt="Logo" />
        <Link to="/">
          <img src={textIcon} alt="Logo-Text" />
        </Link>
      </div>
      <div className="ml-auto flex flex-row items-center gap-4">
        <div className="flex flex-row items-center border border-[#CDCDCD] rounded-md px-2 py-1 ">
          <input
            className="outline-none hidden lg:w-[400px] lg:flex"
            placeholder="Search..."
          />
          <img
            src={search}
            alt="Search-Icon"
            className=" hover:cursor-pointer"
          />
        </div>

        <button className=" font-semibold">SignUp</button>

        <button className=" font-semibold">Login</button>
      </div>
    </div>
  );
};

export default Navbar;
