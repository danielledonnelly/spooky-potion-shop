import React, { useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import IngredientsList from './components/IngredientList';
import PotionBrewer from './components/PotionBrewer';

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const addIngredient = (ingredient) => {
    setSelectedIngredients((prevIngredients) => [...prevIngredients, ingredient]);
    console.log(`Added ${ingredient} to the potion!`);
  };

  return (
    <Container>
      <Typography variant="h4" align="center" marginY={4}>
      </Typography>
      {/* Grid to display ingredients and brewing area side by side */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <IngredientsList addIngredient={addIngredient} />
        </Grid>

        <Grid item xs={12} md={6}>
          <PotionBrewer selectedIngredients={selectedIngredients} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;