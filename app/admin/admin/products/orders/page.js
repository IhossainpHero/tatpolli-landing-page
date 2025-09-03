import connectDB from "@/app/lib/dbConnect";
import Order from "@/app/models/Order";

export default async function OrdersPage() {
  await connectDB();
  const orders = await Order.find({});

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">সকল অর্ডার</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">এখনো কোনো অর্ডার নেই।</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">
                অর্ডার আইডি: {order._id.toString()}
              </h2>
              <p>
                <strong>গ্রাহকের নাম:</strong> {order.customerName}
              </p>
              <p>
                <strong>ফোন:</strong> {order.phone}
              </p>
              <p>
                <strong>ঠিকানা:</strong> {order.address}
              </p>
              <p>
                <strong>তারিখ:</strong>{" "}
                {new Date(order.orderDate).toLocaleDateString()}
              </p>

              <h3 className="text-lg font-bold mt-4 mb-2">পণ্যসমূহ:</h3>
              <ul className="list-disc list-inside">
                {order.products.map((product, index) => (
                  <li key={index}>
                    {product.name} - ৳{product.price}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
