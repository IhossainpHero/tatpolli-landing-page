import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import Order from "./models/Order";

import ProductOrderForm from "@/components/ProductOrderForm";
import YouTubePlayer from "@/components/YouTubePlayer";
import connectDB from "../app/lib/dbConnect";
import Product from "./models/Product";

export const dynamic = "force-dynamic";

export default async function Home() {
  await connectDB();
  const products = (await Product.find({}).sort({ createdAt: -1 }).lean()).map(
    (product) => ({
      ...product,
      _id: product._id.toString(),
    })
  );

  const orders = (await Order.find({}).sort({ createdAt: -1 }).lean()).map(
    (order) => {
      // Each product inside the order also needs its _id converted to a string.
      const serializableProducts = order.products.map((product) => ({
        ...product,
        _id: product._id.toString(),
      }));

      return {
        ...order,
        _id: order._id.toString(),
        createdAt: order.createdAt.toISOString(),
        products: serializableProducts,
      };
    }
  );

  return (
    <main>
      <HeroSection />
      <YouTubePlayer />
      <ProductGrid products={products} />
      <ProductOrderForm products={products} />
      {/* <OrdersSection orders={orders} /> */}
    </main>
  );
}
