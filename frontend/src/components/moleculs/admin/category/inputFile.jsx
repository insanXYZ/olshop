import { useState } from "react";
import { CiImageOn } from "react-icons/ci";

export default ({ onchangeImage, className }) => {
    const [imageUrl, setImageUrl] = useState(null);

    const handleChangeImage = (e) => {
        if (e.target.files && e.target.files.length == 1) {
            setImageUrl(URL.createObjectURL(e.target.files[0]));
            onchangeImage(e.target.files[0]);
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
                <div className="w-full rounded-lg h-32 flex items-center justify-center border-2 border-dashed">
                    <CiImageOn className="text-3xl" />
                </div>
            ) : (
                <img
                    className="h-full object-cover aspect-square"
                    src={imageUrl}
                />
            )}
        </label>
    );
};
