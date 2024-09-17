import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import IngredientsList from './components/IngredientList';
import PotionBrewer from './components/PotionBrewer';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const addIngredient = (ingredient) => {
    setSelectedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    console.log(`Added ${ingredient} to the potion!`);
  };

  return (
    <div>
      <IngredientsList addIngredient={addIngredient} />
      <div className="selected-ingredients">
        <h2>Selected Ingredients:</h2>
        <ul>
          {selectedIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default App;
