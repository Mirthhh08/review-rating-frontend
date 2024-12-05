import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getCompanyById } from "../store/Slices/companySlice";
import { getCompanyReviews, cleanUpReviews } from "../store/Slices/reviewSlice";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import CompanyDetail from "../components/CompanyDetail";
import ReviewCard from "../components/ReviewCard";
import AddReview from "../components/AddReview";

const DetailReview = () => {
  const { companyId } = useParams();
  const dispatch = useDispatch();
  const company = useSelector((state) => state.company?.company);
  const reviews = useSelector((state) => state.review?.reviews);

  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (companyId) {
      dispatch(getCompanyById({ companyId }));
      dispatch(getCompanyReviews({ companyId }));
    }

    return () => dispatch(cleanUpReviews());
  }, [dispatch, companyId]);

  const handleChange = () => {
    setIsActive((prev) => !prev);
  };
  return (
    <>
      <Navbar />

      <div className="mt-10 flex flex-col items-center justify-center w-full  ">
        <div className="flex flex-col items-center justify-center p-6 ">
          <CompanyDetail
            key={company?._id}
            id={company?._id}
            name={company?.name}
            address={company?.address}
            city={company?.city}
            founded={company?.founded}
            logo={company?.logo.url}
            reviewsCount={company?.reviews.length}
            rating={company?.averageRating}
            handleChange={handleChange}
          />
        </div>

        {reviews?.length > 0 ? (
          <div className="px-4 flex flex-col items-center gap-5">
            {reviews?.map((review) => (
              <ReviewCard
                key={review._id}
                fullName={review.name}
                review={review.reviewText}
                rating={review.rating}
                createdAt={review.createdAt}
              />
            ))}
          </div>
        ) : (
          <div>No Reviews Found</div>
        )}
      </div>

      {isActive && (
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[400px]">
          <AddReview handleChange={handleChange} />
        </div>
      )}
    </>
  );
};

export default DetailReview;
