import React, { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import DetailReview from "./pages/DetailReview";
import Home from "./pages/Home";
import { getAllCompanies } from "./store/Slices/companySlice";
import AddCompany from "./components/AddCompany";

function App() {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);

  const handleChange = () => {
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    dispatch(getAllCompanies());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home isActive={isActive} handleChange={handleChange} />}
        />
        <Route path="/detail-review/:companyId" element={<DetailReview />} />
      </Routes>

      {isActive && (
        <div className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 w-[400px]">
          <AddCompany handleChange={handleChange} />
        </div>
      )}

      <Toaster
        position="top-right"
        reverseOrder={true}
        toastOptions={{
          error: {
            style: { borderRadius: "0", color: "red" },
          },
          success: {
            style: { borderRadius: "0", color: "green" },
          },
          duration: 2000,
        }}
      />
    </>
  );
}

export default App;
