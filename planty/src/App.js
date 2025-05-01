import React, { useEffect, useState } from "react";
import PlantCard from "./PlantCard";
import PlantForm from "./PlantForm";
import Search from "./Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then(setPlants);
  }, []);

  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  function handleToggleSoldOut(id) {
    const plantToUpdate = plants.find((p) => p.id === id);
    const updatedSoldOut = !plantToUpdate.soldOut;

    fetch(`http://localhost:6001/plants/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ soldOut: updatedSoldOut })
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        setPlants(plants.map((plant) =>
          plant.id === updatedPlant.id ? updatedPlant : plant
        ));
      });
  }

  function handleDeletePlant(id) {
    fetch(`http://localhost:6001/plants/${id}`, {
      method: "DELETE"
    }).then(() => {
      setPlants(plants.filter((plant) => plant.id !== id));
    });
  }

  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <h1>🌿 Plantsy 🌱</h1>
      <Search search={search} onSearchChange={setSearch} />
      <PlantForm onAddPlant={handleAddPlant} />
      <ul className="plants-list">
        {displayedPlants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onToggleSoldOut={handleToggleSoldOut}
            onDelete={handleDeletePlant}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;

