import ProductsGrid from "@/components/product-grid/products-grid";
const getProducts = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/products`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return { message: "Error fetching product" };
  }
};

export default async function Register() {
  const products = await getProducts();
  return <ProductsGrid />;
}
