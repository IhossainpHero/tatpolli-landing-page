"use client";

export default function ProductCard({ product, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <div className="relative w-full h-64">
        <img
          src={product.imageURL}
          alt={product.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl text-gray-400 font-semibold mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 line-through">৳{product.regularPrice}</p>
        <p className="text-green-600 text-2xl font-bold">
          ৳{product.offerPrice}
        </p>
        <p className="text-gray-500 mt-2">
          {product.details.substring(0, 50)}...
        </p>
      </div>
    </div>
  );
}
