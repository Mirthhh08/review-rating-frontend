import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addCompany, getAllCompanies } from "../store/Slices/companySlice";
import { useDispatch } from "react-redux";
import GetImagePreview from "./GetImagePreview";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
const AddCompany = ({ handleChange }) => {
  const {
    control,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    logo: "",
    companyName: "",
    location: "",
    foundedOn: "",
    city: "",
  });

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  const handleLogoChange = (file) => {
    setFormData((prevData) => ({
      ...prevData,
      logo: file,
    }));
  };

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.companyName.trim(),
      location: formData.location.trim(),
      foundedOn: formData.foundedOn,
      city: formData.city.trim(),
      logo: formData.logo,
    };

    const invalidCharacterPattern = /[^a-zA-Z\s]/;

    if (!data.name) {
      toast.error("Company Name must not be empty!");
      return;
    }
    if (invalidCharacterPattern.test(data.name)) {
      toast.error(
        "Company Name must not contain special characters or numbers!"
      );
      return;
    }

    if (!data.location) {
      toast.error("Location must not be empty!");
      return;
    }
    if (!data.foundedOn) {
      toast.error("Founded On must not be empty!");
      return;
    }
    if (new Date(data.foundedOn) > new Date()) {
      toast.error("Founded On date cannot be in the future!");
      return;
    }
    if (!data.city) {
      toast.error("City must not be empty!");
      return;
    }
    if (invalidCharacterPattern.test(data.city)) {
      toast.error("City must not contain special characters or numbers!");
      return;
    }
    if (!data.logo) {
      toast.error("Logo must be uploaded!");
      return;
    }

    try {
      const response = await dispatch(addCompany(data)); 
      dispatch(getAllCompanies({}));
      handleChange();
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  return (
    <div className="relative bg-white flex flex-col p-10 shadow-lg rounded-md">
      <p className="text-lg font-bold mb-4">Add Company</p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <GetImagePreview
            name="logo"
            control={control}
            className="w-full h-28 object-cover border-none border-slate-900"
            cameraIcon
            onFileChange={handleLogoChange}
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="companyName" className="text-gray-700 font-medium">
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            placeholder="Enter..."
            value={formData.companyName}
            onChange={handleFormChange}
            className="border border-gray-300 p-2 rounded-md outline-none"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="location" className="text-gray-700 font-medium">
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Enter..."
            value={formData.location}
            onChange={handleFormChange}
            className="border border-gray-300 p-2 rounded-md outline-none"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="foundedOn" className="text-gray-700 font-medium">
            Founded On
          </label>
          <div className="relative">
            <input
              type="date"
              id="foundedOn"
              value={formData.foundedOn}
              onChange={handleFormChange}
              className="w-full border border-gray-300 p-2 rounded-md outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="city" className="text-gray-700 font-medium">
            City
          </label>
          <input
            type="text"
            id="city"
            placeholder="Enter City"
            value={formData.city}
            onChange={handleFormChange}
            className="border border-gray-300 p-2 rounded-md outline-none"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#D100F3]  to-[#002BC5] text-white py-2 rounded-md"
          >
            Save
          </button>
        </div>
      </form>

      <div className="absolute right-10 hover:cursor-pointer">
        <IoMdClose size={30} onClick={handleChange} />
      </div>
    </div>
  );
};

export default AddCompany;
