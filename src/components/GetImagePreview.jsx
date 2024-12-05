import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { FaCamera } from "react-icons/fa";

function GetImagePreview({
  name,
  control,
  label,
  defaultValue = "",
  className,
  cameraIcon = false,
  cameraSize = 20,
  image,
  onFileChange,
}) {
  const [preview, setPreview] = useState(null);

  const handlePreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      if (onFileChange) onFileChange(file);
    }
  };
  return (
    <>
      <div className="w-full">
        <label
          htmlFor={name}
          className="cursor-pointer relative flex flex-col justify-center items-start"
        >
          {label && <label className="inline-block mb-2 pl-1">{label}</label>}
          <img src={preview || image} className={className} />
          {cameraIcon && (
            <FaCamera
              size={cameraSize}
              className="hover:text-purple-500 absolute inline-flex justify-center items-center w-full"
            />
          )}
          
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue || ""}
            render={({ field: { onChange } }) => (
              <input
                id={name}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  onChange(handlePreview(e));
                }}
              />
            )}
            rules={{
              required: `${name} is required`,
              validate: {
                size: (file) =>
                  (file && file.size <= 2 * 1024 * 1024) ||
                  "File size must be less than 2MB",
                type: (file) =>
                  (file && ["image/jpeg", "image/png"].includes(file.type)) ||
                  "Only JPEG and PNG files are allowed",
              },
            }}
          />
        </label>
      </div>
    </>
  );
}

export default GetImagePreview;
