"use client";

import { useEffect, useState } from "react";

export default function AdminProductPanel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newProduct, setNewProduct] = useState({
    name: "",
    offerPrice: "",
    imageFile: null, // Change to store the file object
    imageURL: "",
    regularPrice: "",
    details: "",
    imageID: "",
  });
  const [addingProduct, setAddingProduct] = useState(false);
  const [addError, setAddError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${window.location.origin}/api/admin/add-product`
      );
      if (!res.ok) throw new Error("পণ্য লোড করতে সমস্যা হয়েছে।");
      const data = await res.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("পণ্য লোড করতে ব্যর্থ হয়েছে।");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!id) {
      setError("পণ্য আইডি অবৈধ।");
      return;
    }

    try {
      const res = await fetch(
        `${window.location.origin}/api/admin/add-product?id=${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("পণ্য মুছে ফেলতে ব্যর্থ হয়েছে।");
      await fetchProducts(); // Refresh the list
    } catch (err) {
      console.error("Error deleting product: ", err);
      setError("পণ্য মুছে ফেলতে ব্যর্থ হয়েছে।");
    }
  };

  // The main function to handle both form submission and image upload
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAddingProduct(true);
    setAddError(null);

    const { name, offerPrice, imageFile, regularPrice, details } = newProduct;

    if (!name || !offerPrice || !imageFile || !regularPrice || !details) {
      setAddError("দয়া করে সকল তথ্য পূরণ করুন।");
      setAddingProduct(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("offerPrice", offerPrice);
    formData.append("regularPrice", regularPrice);
    formData.append("details", details);
    formData.append("image", imageFile); // Append the image file directly

    try {
      const res = await fetch(
        `${window.location.origin}/api/admin/add-product`,
        {
          method: "POST",
          body: formData, // No Content-Type header needed for FormData
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "পণ্য যোগ করতে ব্যর্থ হয়েছে।");
      }

      setNewProduct({
        name: "",
        offerPrice: "",
        imageFile: null,
        regularPrice: "",
        details: "",
        imageID: "",
        imageURL: "",
      });
      setAddError(null);
      await fetchProducts(); // Refresh the list
    } catch (err) {
      console.error("Error adding product: ", err);
      setAddError(err.message);
    } finally {
      setAddingProduct(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">অ্যাডমিন প্যানেল</h1>
          <p className="text-gray-500 mt-2">
            নতুন পণ্য যোগ করুন এবং বিদ্যমান পণ্য পরিচালনা করুন।
          </p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6 text-center font-medium">
            {error}
          </div>
        )}

        {/* Add Product Form */}
        <div className="bg-white p-6 rounded-2xl shadow-xl mb-8">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 text-green-500"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 4a1 1 0 0 0-1 1v6H5a1 1 0 0 0 0 2h6v6a1 1 0 0 0 2 0v-6h6a1 1 0 0 0 0-2h-6V5a1 1 0 0 0-1-1z" />
            </svg>{" "}
            নতুন পণ্য যোগ করুন
          </h2>
          {addError && (
            <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-4 text-center font-medium">
              {addError}
            </div>
          )}
          <form
            onSubmit={handleAddProduct}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <input
              type="text"
              placeholder="পণ্যের নাম"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              placeholder="পণ্যের বিস্তারিত"
              value={newProduct.details}
              onChange={(e) =>
                setNewProduct({ ...newProduct, details: e.target.value })
              }
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="মূল্য (৳)"
              value={newProduct.offerPrice}
              onChange={(e) =>
                setNewProduct({ ...newProduct, offerPrice: e.target.value })
              }
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="number"
              placeholder="সাধারণ মূল্য (৳)"
              value={newProduct.regularPrice}
              onChange={(e) =>
                setNewProduct({ ...newProduct, regularPrice: e.target.value })
              }
              className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            {/* Image Upload Input */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                পণ্য ছবি আপলোড করুন
              </label>
              <input
                type="file"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, imageFile: e.target.files[0] })
                }
                className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
                required
              />
              {newProduct.imageFile && (
                <div className="mt-4 flex items-center space-x-4">
                  <img
                    src={URL.createObjectURL(newProduct.imageFile)}
                    alt="Uploaded product preview"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <p className="text-sm text-gray-500">
                    ছবি নির্বাচন করা হয়েছে!
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={addingProduct}
              className="md:col-span-3 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {addingProduct ? "যোগ করা হচ্ছে..." : "পণ্য যোগ করুন"}
            </button>
          </form>
        </div>

        {/* All Products Section */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            সকল পণ্য ({products.length})
          </h2>
          {/* Modified grid layout for all devices */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded-xl flex flex-col items-center text-center space-y-4 shadow-sm hover:shadow-md transition"
              >
                <div className="relative w-full h-40 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 w-full mt-2">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-gray-600">৳{product.offerPrice}</p>
                </div>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="p-3 text-red-500 hover:text-red-700 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm4-11h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
