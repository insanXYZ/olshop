import { useState } from "react";

export default ({ data, onchangeImage, className }) => {
    const [imageUrl, setImageUrl] = useState(null);

    const handleChangeImage = (e) => {
        if (e.target.files && e.target.files.length == 1) {
            setImageUrl(URL.createObjectURL(e.target.files[0]));
            onchangeImage(e.target.files[0]);
        }
    };

    return (
        <label className={className} htmlFor="imageCategoryUpdate">
            <input
                onChange={handleChangeImage}
                id="imageCategoryUpdate"
                type="file"
                accept="image/*"
                className="hidden"
            />
            {imageUrl == null ? (
                <img
                    className="h-full object-cover aspect-square"
                    src={data.image}
                />
            ) : (
                <img
                    className="h-full object-cover aspect-square"
                    src={imageUrl}
                />
            )}
        </label>
    );
};
