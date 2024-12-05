import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { addReview, getCompanyReviews } from "../store/Slices/reviewSlice";
import { IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa6";

const AddReview = ({ handleChange, refreshCompanyDetails }) => {
  const companyId = useParams();
  const {
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    reviewText: "",
  });

  const [rating, setRating] = useState(0);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: formData.fullName.trim(),
      subject: formData.subject.trim(),
      reviewText: formData.reviewText.trim(),
      rating: rating,
      companyId: companyId.companyId,
    };

    const invalidCharacterPattern = /[^a-zA-Z\s]/;

    if (!data.name) {
      toast.error("Name must not be empty!");
      return;
    }
    if (invalidCharacterPattern.test(data.name)) {
      toast.error("Name must not contain special characters or numbers!");
      return;
    }

    if (!data.subject) {
      toast.error("Subject must not be empty!");
      return;
    }

    if (!data.reviewText) {
      toast.error("Review must not be empty!");
      return;
    }

    if (data.rating == 0) {
      toast.error("Please provide rating!");
    }

    try {
      const response = await dispatch(addReview(data));
      
      if (response) {
        await dispatch(getCompanyReviews(companyId));
        refreshCompanyDetails();
        handleChange();
      }
    } catch (error) {
      console.error("Error adding company:", error);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          onClick={() => handleRatingChange(i)}
          className={`cursor-pointer ${
            i <= rating ? "text-yellow-500" : "text-gray-300"
          }`}
        >
          <FaStar size={24} />
        </span>
      );
    }
    return stars;
  };

  const getFeedbackText = () => {
    if (rating === 1 || rating === 2) return "Not Satisfied";
    if (rating === 3 || rating === 4) return "Satisfied";
    if (rating === 5) return "Excellent";
    return "";
  };

  return (
    <div className="relative bg-white flex flex-col p-10 shadow-lg rounded-md">
      <p className="text-lg font-bold mb-4">Add Review</p>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label htmlFor="fullName" className="text-gray-700 font-medium">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter..."
            value={formData.fullName}
            onChange={handleFormChange}
            className="border border-gray-300 p-2 rounded-md outline-none"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="subject" className="text-gray-700 font-medium">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Enter..."
            value={formData.subject}
            onChange={handleFormChange}
            className="border border-gray-300 p-2 rounded-md outline-none"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="reviewText" className="text-gray-700 font-medium">
            Review
          </label>
          <textarea
            type="text"
            id="reviewText"
            placeholder="Description"
            value={formData.city}
            onChange={handleFormChange}
            className="border border-gray-300 p-2 rounded-md outline-none"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 mb-2">{renderStars()}</div>
          <p className="text-gray-600 font-medium">{getFeedbackText()}</p>
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

export default AddReview;
