import Carousel from "../atoms/Carousel";

export default ({
  images,
  className = "w-full",
  source = "url",
  thumbs = false,
}) => {
  return (
    <div className={className}>
      {images.length > 1 ? (
        <Carousel showThumbs={thumbs}>
          {images.map((v, i) => (
            <div key={i} className="bg-dark-neutral rounded-2xl">
              <img src={v[source]} className={"aspect-square object-contain"} />
            </div>
          ))}
        </Carousel>
      ) : (
        <img
          src={images[0][source]}
          className={"aspect-square object-contain"}
        />
      )}
    </div>
  );
};
