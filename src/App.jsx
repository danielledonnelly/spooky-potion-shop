import React, { useState } from 'react';
import { Container, Typography, Box, Grid2 } from '@mui/material';
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

      {/* Grid2 from Material UI V5 */}
      <Grid2 container spacing={3}>
        <Grid2 xs={12} md={6}>
          <IngredientsList addIngredient={addIngredient} />
        </Grid2>

        <Grid2 xs={12} md={6}>
          <PotionBrewer selectedIngredients={selectedIngredients} />
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default App;