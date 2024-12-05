import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCompanies,
  makeCompaniesNull,
} from "../store/Slices/companySlice";
import Navbar from "../components/Navbar";
import location from "../assets/location.png";
import { IoIosSearch } from "react-icons/io";
import CompanyCard from "../components/CompanyCard";

const Home = ({ handleChange }) => {
  const dispatch = useDispatch();
  const companies = useSelector((state) => state.company?.companies);
  const [sortBy, setSortBy] = useState("");
  const [query, setQuery] = useState("");
  const handleSortByChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
  };
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    dispatch(getAllCompanies({ query, sortBy }));
  };
  useEffect(() => {
    dispatch(getAllCompanies({ sortBy }));
    return () => dispatch(makeCompaniesNull());
  }, [dispatch, sortBy]);

  return (
    <div className="">
      <Navbar />
      <div className="flex flex-col  gap-4 py-8 px-4 items-center">
        <div className="flex flex-row items-center gap-2 flex-wrap">
          <div className="flex-col gap-2 mt-2">
            <label htmlFor="city" className="text-[#4A4A4A]">
              Select City
            </label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <input
                  id="city"
                  type="text"
                  placeholder="Indore, Madhya Pradesh, India"
                  className="outline-none lg:w-[350px]"
                  value={query}
                  onChange={handleQueryChange}
                />
                <img src={location} alt="Location Icon" className="ml-2" />
              </div>
              <button
                className="bg-gradient-to-r from-[#D100F3] to-[#002BC5] text-white font-semibold  px-4 py-2 rounded-md"
                onClick={handleSearchClick}
              >
                <p className="hidden md:flex">Find Company</p>
                <IoIosSearch className="md:hidden flex " size={24} />
              </button>
            </div>
          </div>
          <div className="flex items-end gap-4">
            <button
              className="bg-gradient-to-r from-[#D100F3] to-[#002BC5] font-semibold text-white px-4 py-2 rounded-md"
              onClick={handleChange}
            >
              + Add Company
            </button>
            <div className="flex flex-col gap-2">
              <label htmlFor="sort" className="text-[#4A4A4A]">
                Sort:
              </label>
              <div className="flex items-center gap-4 ">
                <div className="flex items-center ">
                  <select
                    id="sort"
                    className="outline-none border border-gray-300 rounded-md p-2 hover:cursor-pointer"
                    value={sortBy}
                    onChange={handleSortByChange}
                  >
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="averageRating">Rating</option>
                    <option value="city">Location</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {companies?.length > 0 ? (
          <div className="mt-16 flex flex-col items-start justify-evenly gap-4 ">
            {companies?.map((company) => (
              <CompanyCard
                key={company?._id}
                id={company?._id}
                name={company?.name}
                address={company?.address}
                city={company?.city}
                founded={company?.founded}
                logo={company?.logo.url}
                reviewsCount={company?.reviews.length}
                rating={company?.averageRating}
              />
            ))}
          </div>
        ) : (
          <div className="mt-16 font-semibold">
            {" "}
            No Companies Found! Search Somthing else
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
