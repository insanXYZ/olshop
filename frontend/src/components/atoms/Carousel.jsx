import { Carousel } from "react-responsive-carousel";

export default ({ children, ...att }) => {
  return (
    <Carousel
      showArrows={false}
      showStatus={false}
      showIndicators={true}
      autoPlay={true}
      infiniteLoop={true}
      {...att}
    >
      {children}
    </Carousel>
  );
};
