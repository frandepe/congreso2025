import { PatrocinadoresComponent } from "@/components/SliderPatrocinadores/Patrocinadores";
import SliderPatrocinadores from "@/components/SliderPatrocinadores/SliderPatrocinadores";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import React from "react";

export const Patrocinadores = () => {
  // const content = [
  //   {
  //     title: "LuxeStay",
  //     description:
  //       "Explore the ultimate comfort with LuxeStay, where every detail is crafted for relaxation. Experience the perfect balance of elegance and convenience, offering you a getaway like no other.",
  //     content: "/assets/hoteles/betanzos.jpg",
  //   },
  //   {
  //     title: "Skyline Suites",
  //     description:
  //       "Skyline Suites offers unmatched luxury with a breathtaking view of the city. Whether you're here for business or leisure, our suites provide the perfect base for your adventures.",
  //     content: "/assets/hoteles/boxer.jpg",
  //   },
  //   {
  //     title: "Forest Haven",
  //     description:
  //       "Nestled in the heart of nature, Forest Haven provides a peaceful retreat away from the hustle and bustle. Perfect for nature lovers, our rooms offer a cozy atmosphere and scenic views.",
  //     content: "/assets/hoteles/descanso.jpg",
  //   },
  //   {
  //     title: "Mountain Crest",
  //     description:
  //       "Mountain Crest is the ideal destination for those seeking serenity and adventure. With modern amenities and picturesque landscapes, your stay will be one to remember.",
  //     content: "/assets/hoteles/el-forestal.jpg",
  //   },
  //   {
  //     title: "Sunset Lodge",
  //     description:
  //       "Enjoy a relaxing stay at Sunset Lodge, where stunning sunsets meet unrivaled comfort. Our spacious rooms and top-notch facilities promise a memorable experience for all guests.",
  //     content: "/assets/hoteles/la-quinta.jpg",
  //   },
  //   {
  //     title: "Riverside Retreat",
  //     description:
  //       "Riverside Retreat offers the perfect blend of tranquility and adventure. Whether you're fishing by the river or exploring nearby trails, your stay will be unforgettable.",
  //     content: "/assets/hoteles/Indiada.jpg",
  //   },
  //   {
  //     title: "Ocean Breeze Inn",
  //     description:
  //       "Ocean Breeze Inn is your beachfront oasis, providing luxurious rooms with ocean views. Enjoy the sound of the waves and the refreshing sea breeze as you unwind in style.",
  //     content: "/assets/hoteles/paye.jpg",
  //   },
  // ];

  return (
    <div>
      <PatrocinadoresComponent />
      <SliderPatrocinadores />
      {/* <div className="mt-20">
        <StickyScroll content={content} />
      </div> */}
    </div>
  );
};
