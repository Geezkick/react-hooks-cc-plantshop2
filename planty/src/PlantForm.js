import React, { useState } from "react";

function PlantForm({ onAddPlant }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newPlant = {
      name: formData.name,
      image: formData.image,
      price: parseFloat(formData.price)
    };

    fetch("http://localhost:6001/plants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPlant)
    })
      .then((r) => r.json())
      .then((newPlantData) => {
        onAddPlant(newPlantData);
        setFormData({ name: "", image: "", price: "" });
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Plant name" required />
      <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" required />
      <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default PlantForm;
