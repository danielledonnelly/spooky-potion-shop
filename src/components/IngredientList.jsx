import React from 'react';

const ingredients = [
  { name: 'Pumpkin', image: './src/assets/pumpkin.png' },
  { name: 'Gummy Bear', image: './src/assets/gummy-bear.png' },
  { name: 'Spider Web', image: './src/assets/spider-web.png' },
  { name: 'Crow Feather', image: './src/assets/crow-feather.png' },
  { name: 'Skull', image: './src/assets/skull.png' },
  { name: 'Bat', image: './src/assets/bat.png' },
  { name: 'Candy Corn', image: './src/assets/candy-corn.png' },
  { name: 'Mushroom', image: './src/assets/mushroom.png' },
  { name: 'Ghost', image: './src/assets/ghost.png' }
];

const IngredientList = ({ addIngredient }) => {
  return (
    <div className="grid-container">
      {ingredients.map((ingredient) => (
        <button
          key={ingredient.name}
          className="ingredient-button"
          onClick={() => addIngredient(ingredient.name)}
        >
          <img src={ingredient.image} alt={ingredient.name} />
        </button>
      ))}
    </div>
  );
};

export default IngredientList;
