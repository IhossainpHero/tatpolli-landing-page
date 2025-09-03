"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [showOrderForm, setShowOrderForm] = useState(false);

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
        <div className="relative w-full h-64">
          <Image
            src={product.imageURL}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 line-through">৳{product.regularPrice}</p>
          <p className="text-green-600 text-2xl font-bold">
            ৳{product.offerPrice}
          </p>
          <p className="text-gray-500 mt-2">
            {product.details.substring(0, 500)}...
          </p>
        </div>
      </div>
    </>
  );
}
