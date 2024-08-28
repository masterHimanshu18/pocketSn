import { useState } from "react"
import ProductCard from "../components/productCard";

const Search = () => {

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState(100000);
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);

    const addToCartHandler = () => {};

    const isPrevPage = page > 1;
    const isNextPage = page < 4;


  return (
    <div className="product-search-page">
        <aside>
            <h2>Filters</h2>
            <div>
                <h4>Sort</h4>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="">Default</option>
                    <option value="asc">Price (Low to High)</option>
                    <option value="dsc">Price (High to Low)</option>
                </select>
            </div>
            <div>
                <h4>Max Price: {maxPrice || ""}</h4>
                <input type="range" min={100} max={100000} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} />
            </div>
            <div>
                <h4>Category</h4>
                <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="">All</option>
                    <option value="shirt">Shirt</option>
                    <option value="jeans">Jeans</option>
                </select>
            </div>
        </aside>
        <main>
            <h1>Products</h1>
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}/>
            <div className="search-product-list">
                <ProductCard productId="adasda" name="Double Pocket Light Blue Overshirt" price={1545} stock={435} handler={addToCartHandler} photo="https://www.snitch.co.in/cdn/shop/files/6474a298d8217c03f5e45a1717f31f0b.webp?v=1723198378&width=1080"/>
                <ProductCard productId="adasda" name="Double Pocket Light Blue Overshirt" price={1545} stock={435} handler={addToCartHandler} photo="https://www.snitch.co.in/cdn/shop/files/6474a298d8217c03f5e45a1717f31f0b.webp?v=1723198378&width=1080"/>
                <ProductCard productId="adasda" name="Double Pocket Light Blue Overshirt" price={1545} stock={435} handler={addToCartHandler} photo="https://www.snitch.co.in/cdn/shop/files/6474a298d8217c03f5e45a1717f31f0b.webp?v=1723198378&width=1080"/>

            </div>
            <article>
                <button disabled={!isPrevPage} onClick={() => setPage((prev) => prev - 1)}>Prev</button>
                <span>{page} of {4}</span>
                <button disabled={!isNextPage} onClick={() => setPage((prev) => prev + 1)}>Next</button>

            </article>
        </main>
        
    </div>
  )
}

export default Search