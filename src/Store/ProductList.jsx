import React, { useEffect, useState } from "react";
import Product from "./Product";

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const displayCategories = () => {
    const filteredCategories = categoryList.filter((category) =>
      ["electronics", "jewelery", "men's clothing", "women's clothing"].includes(category)
    );

    return filteredCategories.map((category, index) => (
      <button
        key={index}
        className={`btn btn-secondary ${selectedCategory === category ? "active" : ""}`}
        onClick={() => handleCategoryClick(category)}
      >
        {category}
      </button>
    ));
  };

  const displayProducts = () => {
    let productsTemp = productList;
  
    // Apply category filter if a category is selected
    if (selectedCategory) {
      productsTemp = productsTemp.filter((product) =>
        product.category.includes(selectedCategory)
      );
    }
  
    // Apply search filter
    productsTemp = productsTemp.filter(
      (product) =>
        product.title.includes(searchInput) ||
        product.id.toString().includes(searchInput) ||
        product.description.includes(searchInput)
    );
  
    return productsTemp.map((product, key) => (
      <Product
        key={key}
        product={product}
        onCategoryClick={handleCategoryClick} // Pass the category click handler
      />
    ));
  };

  const getProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((response) => setProductList(response));
  };

  const getCategories = () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((response) => setCategoryList(response));
  };

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchValue = document.querySelector("#search").value;
    setSearchInput(searchValue);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container-fluid mx-auto w-75 my-3">
      <div className="container mt-5">
        <h2>Search:</h2>
        <form onSubmit={handleSearch}>
          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                id="search"
                className="form-control"
                placeholder="Search products..."
              />
              <div className="input-group-append">
                <button className="btn btn-primary" type="submit">
                  Search
                </button>
              </div>
            </div>
          </div>
          <h5>Categories</h5>
          <div className="container mt-5">
            <div className="btn-group">{displayCategories()}</div>
          </div>
        </form>
      </div>

      <h1>Products:</h1>
      <table className="table">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Image</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>{displayProducts()}</tbody>
      </table>
    </div>
  );
}
