import React from "react";

function PlantCard({ plant, onToggleSoldOut }) {
  return (
    <li className="plant-card">
      <img src={plant.image} alt={plant.name} />
      <h3>{plant.name}</h3>
      <p>${plant.price}</p>
      <button onClick={() => onToggleSoldOut(plant.id)}>
        {plant.soldOut ? "Sold Out" : "In Stock"}
      </button>
    </li>
  );
}

export default PlantCard;
