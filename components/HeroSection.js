"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="relative h-[40vh] flex flex-col justify-start items-center text-center text-white p-4">
      {/* ব্যানার ইমেজ */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/banner.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Seller Dashboard Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => router.push("/admin/login")}
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-1 px-3 rounded-full shadow-lg text-sm transition-transform transform hover:scale-105"
        >
          Seller Dashboard
        </button>
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

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-3">
          {/* <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105 text-sm">
            অর্ডার নাও
          </button> */}
          <a
            href="https://wa.me/8801620679332"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-transform transform hover:scale-105 text-sm">
              হোয়াটসঅ্যাপ অর্ডার
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
