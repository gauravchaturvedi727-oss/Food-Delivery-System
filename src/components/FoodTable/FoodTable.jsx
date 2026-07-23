import React from "react";
import "./FoodTable.css";

function FoodTable({ foods, onEdit, onDelete }) {
  return (
    <div className="food-table-container">
      <table className="food-table">

        <thead>
          <tr>
            <th>Image</th>
            <th>Food Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {foods.length > 0 ? (
            foods.map((food) => (
              <tr key={food._id}>
                <td>
                  <img
                    className="food-image"
                    src={`http://localhost:3000/upload/${food.image}`}
                    alt={food.name}
                  />
                </td>

                <td>{food.name}</td>

                <td>{food.category}</td>

                <td>₹{food.price}</td>

                <td className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(food)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(food._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="no-food">
                No Foods Found
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
}

export default FoodTable;