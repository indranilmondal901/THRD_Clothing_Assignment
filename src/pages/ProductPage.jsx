import React, { useEffect, useState } from "react";
import "../style/Productpage.css";
import ProductCard from "../components/ProductCard";

const ProductPage = ({products,cartData, setCartData}) => {
  // console.log(products);
  const [search, setSearch] = useState("");
  const [Category, setCategory] = useState("");
  const [PriceRange, setPriceRange] = useState([0, 10000]);

  const [filteredProducts,setFilteredProducts] = useState(products);
  const [categoryList, setCategoryList] = useState([...new Set(products.map((data)=> data.Category))]);

  useEffect(()=>{
    let data = products.filter((product) => {
      return (
        (search === "" || product.ProductName.toLowerCase().includes(search.toLowerCase())) &&
        (Category === "" || product.Category === Category) &&
        product.Price >= PriceRange[0] &&
        product.Price <= PriceRange[1]
      );
    });
    setFilteredProducts(data);
  },[search,Category, PriceRange])

  return (
    <div className="product-filter-page">
      <div className="filters">
        <h2>Filters</h2>
        <div className="filter-section">
          <label>Search by Name</label>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-section">
          <label>Category</label>
          <select value={Category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categoryList.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-section">
          <label>Price Range</label>
          <div className="Price-range">
            <input
              type="number"
              value={PriceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, PriceRange[1]])}
              placeholder="Min"
            />
            <p style={{textAlign:"center", fontWeight:"lighter", margin: "1px"}}>to</p>
            <input
              type="number"
              value={PriceRange[1]}
              onChange={(e) => setPriceRange([PriceRange[0], +e.target.value])}
              placeholder="Max"
            />
          </div>
        </div>
        <button className="clear-filters" onClick={() => { setSearch(""); setCategory(""); setPriceRange([0, 10000]); setFilteredProducts(products) }}>
          Clear All
        </button>
      </div>
      <div className="product-list">
        <h2>Men's Top Sale Picks</h2>
        {filteredProducts.length > 0 ? (
          <div className="products">
            {filteredProducts.map((product) => (
              <ProductCard key={product.ProductID} product={product} cartData={cartData} setCartData={setCartData}/>
            ))}
          </div>
        ) : (
          <p>No products found matching your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;