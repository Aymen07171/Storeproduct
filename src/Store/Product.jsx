import React from "react";
import Rating from "./Rating";

export default function Product({ product, onCategoryClick }) {
  const handleCategoryClick = (category) => {
    // Call the parent component's function to handle category click
    onCategoryClick(category);
  };

  return (
    <tr>
      <td>{product.id}</td>
      <td>{product.title}</td>
      <td>
        <span className="badge badge-pill bg-dark">{product.price}$</span>
      </td>
      <td>{product.description.slice(0, 100)} ....</td>
      <td>
        {/* Make the category clickable */}
        <span
          className="badge badge-pill bg-dark clickable"
          onClick={() => handleCategoryClick(product.category)}
        >
          {product.category}
        </span>
      </td>
      <td>
        <img width={220} src={product.image} alt={product.title} />
      </td>
      <td>
        <Rating rate={product.rating.rate} count={product.rating.count} />
      </td>
    </tr>
  );
}
