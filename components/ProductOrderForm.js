"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const shippingCost = {
  insideDhaka: 60,
  outsideDhaka: 120,
};

export default function ProductOrderForm({ products: initialProducts }) {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [shipping, setShipping] = useState("insideDhaka");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Use useEffect to handle initial products data
  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  const handleProductSelection = (product) => {
    const isSelected = selectedProducts.some((p) => p._id === product._id);
    if (isSelected) {
      setSelectedProducts(
        selectedProducts.filter((p) => p._id !== product._id)
      );
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p._id === productId ? { ...p, quantity: parseInt(newQuantity) || 1 } : p
      )
    );
  };

  const { subtotal, total, finalShippingCost } = useMemo(() => {
    const calculatedSubtotal = selectedProducts.reduce(
      (acc, p) => acc + p.offerPrice * p.quantity,
      0
    );
    const calculatedShippingCost =
      shipping === "insideDhaka"
        ? shippingCost.insideDhaka
        : shippingCost.outsideDhaka;
    return {
      subtotal: calculatedSubtotal,
      total: calculatedSubtotal + calculatedShippingCost,
      finalShippingCost: calculatedShippingCost,
    };
  }, [selectedProducts, shipping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (selectedProducts.length === 0) {
        setMessage("অনুগ্রহ করে অন্তত একটি পণ্য নির্বাচন করুন।");
        setLoading(false);
        return;
      }

      const orderData = {
        customerName,
        phone,
        address,
        products: selectedProducts.map((p) => ({
          name: p.name,
          price: p.offerPrice,
          imageURL: p.imageURL,
          quantity: p.quantity,
          _id: p._id,
        })),
        shipping,
        totalPrice: total,
      };

      const res = await axios.post("/api/orders", orderData);

      if (res.data.success) {
        setMessage("✅ আপনার অর্ডার সফলভাবে জমা হয়েছে!");
        setSelectedProducts([]);
        setCustomerName("");
        setPhone("");
        setAddress("");
      } else {
        setMessage("❌ অর্ডার জমা দিতে ব্যর্থ হয়েছে।");
      }
    } catch (err) {
      setMessage("⚠️ অর্ডার জমা দিতে একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 w-full min-h-screen font-sans">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="bg-white p-6 rounded-2xl shadow-xl text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            অর্ডার করার জন্য নিচের ফর্মটি পূরণ করুন
          </h2>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`p-4 rounded-xl mb-6 text-center font-medium ${
              message.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Left Section (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Selection */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                🛒 পণ্য নির্বাচন করুন
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => {
                  const isSelected = selectedProducts.some(
                    (p) => p._id === product._id
                  );
                  const currentQuantity = isSelected
                    ? selectedProducts.find((p) => p._id === product._id)
                        .quantity
                    : 1;

                  return (
                    <div
                      key={product._id}
                      className={`border rounded-xl p-4 transition-all duration-300 hover:shadow-lg cursor-pointer ${
                        isSelected
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200"
                      }`}
                      onClick={() => handleProductSelection(product)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={product.imageURL}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <p className="font-semibold text-base text-gray-800">
                            {product.name}
                          </p>
                          <p className="text-gray-500 text-sm">
                            ৳{product.offerPrice}
                          </p>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-gray-700 text-sm">সংখ্যা:</p>
                          <input
                            type="number"
                            min="1"
                            value={currentQuantity}
                            onChange={(e) =>
                              handleQuantityChange(product._id, e.target.value)
                            }
                            onClick={(e) => e.stopPropagation()}
                            className="w-20 px-2 py-1 text-center border rounded-md text-gray-800"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Billing Info */}
            <div className="bg-white p-6 rounded-2xl shadow-xl space-y-4">
              <h3 className="text-xl font-bold text-gray-800">📋 বিলিং তথ্য</h3>
              <div>
                <label className="block text-sm font-medium">আপনার নাম</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">ফোন নম্বর</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">ঠিকানা</label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  rows="3"
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>
            </div>

            {/* Shipping */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                🚚 ডেলিভারি
              </h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="shipping"
                    value="insideDhaka"
                    checked={shipping === "insideDhaka"}
                    onChange={(e) => setShipping(e.target.value)}
                    className="h-5 w-5 text-green-600 focus:ring-2 focus:ring-green-500"
                  />
                  <span>ঢাকার ভিতরে (৳{shippingCost.insideDhaka})</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="shipping"
                    value="outsideDhaka"
                    checked={shipping === "outsideDhaka"}
                    onChange={(e) => setShipping(e.target.value)}
                    className="h-5 w-5 text-green-600 focus:ring-2 focus:ring-green-500"
                  />
                  <span>ঢাকার বাইরে (৳{shippingCost.outsideDhaka})</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Section (Order Summary) */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-xl sticky top-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">
                📦 আপনার অর্ডার
              </h3>
              <div className="space-y-3 mb-4">
                {selectedProducts.length > 0 ? (
                  selectedProducts.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 rounded-md overflow-hidden">
                          <Image
                            src={product.imageURL}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <p className="font-medium text-sm text-gray-700">
                          {product.name}
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm">
                        ৳{product.offerPrice} x {product.quantity}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">
                    কোনো পণ্য নির্বাচন করা হয়নি।
                  </p>
                )}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between font-medium text-gray-700">
                  <span>সাবটোটাল</span>
                  <span>৳{subtotal}</span>
                </div>
                <div className="flex justify-between font-medium text-gray-700">
                  <span>ডেলিভারি চার্জ</span>
                  <span>৳{finalShippingCost}</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t pt-2 mt-2">
                  <span>মোট</span>
                  <span>৳{total}</span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading || selectedProducts.length === 0}
              className="w-full py-4 text-white bg-green-600 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "অর্ডার প্রক্রিয়া চলছে..." : `অর্ডার করুন ৳${total}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
