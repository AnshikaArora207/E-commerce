import image1 from "../assets/banner/img1.webp";
import image2 from "../assets/banner/img2.webp";
import image3 from "../assets/banner/img3.jpg";
import image4 from "../assets/banner/img4.jpg";
import image5 from "../assets/banner/img5.webp";

import image1Mobile from "../assets/banner/img1_mobile.jpg";
import image2Mobile from "../assets/banner/img2_mobile.webp";
import image3Mobile from "../assets/banner/img3_mobile.jpg";
import image4Mobile from "../assets/banner/img4_mobile.jpg";
import image5Mobile from "../assets/banner/img5_mobile.png";
import { useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const BannerProduct = () => {
  const [current, setCurrent] = useState(0);
  const desktop = [image1, image2, image3, image4, image5];
  const mobile = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
  ];
  const nextimage = () => {
    if (desktop.length - 1 > current) setCurrent(current + 1);
  };
  const previmage = () => {
    if (desktop.length != 0) setCurrent(current - 1);
  };
  // useEffect(()=>{
  //   const interval = setInterval(()=>{
  //     if(desktop.length-1>current) nextimage();
  //     else setCurrent(0);
  //   },5000)
  //   return ()=>clearInterval(interval);
  // },[])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev < desktop.length - 1 ? prev + 1 : 0));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [desktop.length]);
  return (
    <div className="container mx-auto px-4 py-4 rounded">
      <div className="h-56 md:h-72 w-full bg-[#303030] relative">
        <div className="absolute z-10 h-full w-full flex items-center">
          <div className="justify-between w-full text-2xl hidden md:flex">
            <button
              onClick={previmage}
              className="bg-white shadow-md rounded-full text-black p-1"
            >
              <FaAngleLeft />
            </button>
            <button
              onClick={nextimage}
              className="bg-white shadow-md rounded-full text-black p-1"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
        <div className="md:flex hidden w-full h-full overflow-hidden">
          {desktop.map((imageURL, index) => {
            return (
              <div
                key={index}
                style={{ transform: `translateX(-${current * 100}%)` }}
                className="w-full h-full min-w-full min-h-full transition-all"
              >
                <img src={imageURL} className="w-full h-full" alt="" />
              </div>
            );
          })}
        </div>
        <div className="flex w-full h-full overflow-hidden md:hidden">
          {mobile.map((imageURL, index) => {
            return (
              <div
                key={index}
                style={{ transform: `translateX(-${current * 100}%)` }}
                className="w-full h-full min-w-full min-h-full transition-all"
              >
                <img src={imageURL} className="w-full h-full" alt="" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
