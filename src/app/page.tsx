"use client";
import Header from "./components/Header";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const slider = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img5.jpg",
  "/images/img6.jpg",
  "/images/img7.jpg"
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Header />
      <main className="flex flex-col md:flex-row p-6 md:p-16 gap-8">
        {/* LEFT SIDE - TEXT CONTENT */}
        <div className="flex-1 flex flex-col justify-center space-y-8">
          <div className="bg-black p-8 rounded-xl shadow-[0_10px_20px_-10px_rgba(255,200,150,0.6)] z-50">
            <h3 className="text-3xl font-bold text-[#DFD0B8] leading-snug">
              A fast, secure, and distraction-free video conferencing platform
            </h3>
            <p className="mt-2 text-[#948979] text-lg">
              Built for seamless online meetings, classes, and team collaboration.
            </p>
          </div>

          <div className="bg-black p-8 rounded-xl shadow-[0_10px_20px_-10px_rgba(255,200,150,0.6)] z-50">
            <h3 className="text-3xl font-bold text-[#DFD0B8] leading-snug">
              MeetHub is your virtual room for real connections.
            </h3>
            <p className="mt-2 text-[#948979] text-lg">
              Whether it's your daily stand-up, a study session, or catching up with friends —
              we’ve got your back. Zero friction. Maximum clarity.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - IMAGE CONTENT */}
        <div className="flex-1 flex justify-center items-center">
          <div className="w-[450px] h-[450px] md:w-[500px] md:h-[500px] overflow-hidden rounded-full shadow-[0_0_10px_rgba(255,200,150,0.6),0_0_20px_rgba(255,200,150,0.5),0_0_40px_rgba(255,200,150,0.4)]">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              loop={true}
              className="w-full h-full"
            >
              {slider.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt={`Slide ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </main>
    </div>
  );
}
