import { useState } from "react";
import { CiImageOn } from "react-icons/ci";

export default ({ onchangeFile, className }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files.length == 1) {
      setImageUrl(URL.createObjectURL(e.target.files[0]));
      onchangeFile(e.target.files[0]);
    }
  };

  return (
    <label className={className} htmlFor="imageCategory">
      <input
        onChange={handleChangeImage}
        id="imageCategory"
        type="file"
        accept="image/*"
        className="hidden"
      />
      {imageUrl == null ? (
        <div className="w-full h-full flex items-center justify-center border-2 border-dotted">
          <CiImageOn className="text-3xl" />
        </div>
      ) : (
        <img className="w-full h-full object-contain" src={imageUrl} />
      )}
    </label>
  );
};
