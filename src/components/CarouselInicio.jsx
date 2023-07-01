"use client";
import { Carousel } from "@material-tailwind/react";
import Image from "next/image";
import Slide1 from "../img/slide1.png";
import Slide2 from "../img/slide2.png";

const CarouselInicio = () => {
  return (
    <Carousel transition={{type: "tween", duration: 0.5 }} className="rounded-xl">
      <Image
        src={Slide1}
        alt="slide 1"
        className="h-100 w-full object-cover"
      />
      <Image
        src={Slide2}
        alt="slide 2"
        className="h-full w-full object-cover"
      />
    </Carousel>
  )
}

export default CarouselInicio
