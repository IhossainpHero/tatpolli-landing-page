"use client";

import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="relative h-[40vh] flex flex-col justify-start items-center text-center text-white p-4">
      {/* ব্যানার ইমেজ */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banner.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* কন্টেন্ট */}
      <div className="relative z-10 flex flex-col items-center mt-4">
        {/* লোগো */}
        <div className="mb-5">
          <Image
            src="/images/logo.jpg"
            alt="Company Logo"
            width={80}
            height={80}
            className="rounded-full"
          />
        </div>

        {/* শিরোনাম */}
        <h1 className="text-base text-[#F7F7DC] md:text-lg lg:text-xl font-medium mb-4 leading-snug max-w-xl">
          আরামদায়ক প্রিমিয়াম শাড়ি যা আপনাকে <br />
          আরো স্মার্ট করে তুলবে সবার কাছে।
        </h1>

        {/* বাটন */}
        <div className="flex space-x-2 mt-2">
          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full flex items-center shadow-md transition-transform transform hover:scale-105 text-sm">
            <FontAwesomeIcon icon={faShoppingCart} className="mr-2" /> অর্ডার
            নাও
          </button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full flex items-center shadow-md transition-transform transform hover:scale-105 text-sm">
            <FontAwesomeIcon icon={faWhatsapp} className="mr-2" /> হোয়াটসঅ্যাপ
            অর্ডার
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
