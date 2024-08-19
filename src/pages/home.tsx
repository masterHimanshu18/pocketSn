import { Link } from "react-router-dom";
import ProductCard from "../components/productCard";

export const Home = () => {
    const addToCartHandler= () => {};
  return (
    <div className="home">
        <section></section>

        <h1>Latest Products
            <Link to="/search" className="findmore">
                More
            </Link>
        </h1>

        <main>
            <ProductCard productId="adasda" name="Double Pocket Light Blue Overshirt" price={1545} stock={435} handler={addToCartHandler} photo="https://www.snitch.co.in/cdn/shop/files/6474a298d8217c03f5e45a1717f31f0b.webp?v=1723198378&width=1080"/>
        </main>
    </div>
  )
}

export default Home;