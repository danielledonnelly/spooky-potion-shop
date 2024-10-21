import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, CardMedia, IconButton, Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // Import Help Icon for "?"
import music from './assets/music.mp3';
import cauldronClickSound from './assets/cauldron-click.wav';
import Mascot from './components/Mascot';
import PotionBrewer from './components/PotionBrewer';
import cauldronImage from './assets/cauldron.png';

function App() {
  const [potions, setPotions] = useState(0);
  const [funds, setFunds] = useState(0);
  const [cauldrons, setCauldrons] = useState(1);
  const [witchesHired, setWitchesHired] = useState(0);
  const [marketersHired, setMarketersHired] = useState(0);
  const [cauldronSize, setCauldronSize] = useState(300);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [isSoundEffectsEnabled, setIsSoundEffectsEnabled] = useState(true);
  const [helpOpen, setHelpOpen] = useState(false); // State to handle help dialog open/close

  const audioRef = useRef(null);
  const cauldronClickRef = useRef(null);

  // Handle help dialog open and close
  const handleHelpOpen = () => setHelpOpen(true);
  const handleHelpClose = () => setHelpOpen(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.2;
      if (isMusicEnabled) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicEnabled]);

  // Function to handle potion brewing
  const handleBrew = () => {
    console.log("Brewing... Current potions:", potions);
    setPotions((prev) => {
      const newPotionCount = prev + cauldrons;
      console.log("Updated potions after brewing:", newPotionCount);
      return newPotionCount;
    });
    setCauldronSize((prev) => prev + 10); // Slightly increase the cauldron size
    setTimeout(() => setCauldronSize(300), 200); // Reset cauldron size after 200ms

    if (isSoundEffectsEnabled && cauldronClickRef.current) {
      cauldronClickRef.current.currentTime = 0; // Reset the sound to the beginning
      cauldronClickRef.current.play(); // Play the click sound
    }
  };

  // Function to handle selling potions
  const handleSell = (potionCount, pricePerPotion) => {
    setPotions((prevPotions) => {
      const actualPotionsToSell = Math.min(potionCount, prevPotions); // Ensure you can't sell more than you have
      console.log("Selling... Current potions:", prevPotions, " Potions to sell:", actualPotionsToSell);
      return Math.max(prevPotions - actualPotionsToSell, 0); // Decrease potions by the number sold
    });

    setFunds((prevFunds) => {
      const actualFundsToAdd = potionCount * pricePerPotion;
      const newFunds = prevFunds + actualFundsToAdd;
      console.log("Updated funds after selling:", newFunds);
      return newFunds;
    });
  };

  return (
    <Container sx={{ textAlign: 'center', padding: '20px' }}>
      <Mascot />
      <audio ref={audioRef} loop autoPlay muted={!isMusicEnabled}>
        <source src={music} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <audio ref={cauldronClickRef}>
        <source src={cauldronClickSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Music Toggle Button */}
      <IconButton
        sx={{
          position: 'fixed',
          top: '10px',
          right: '100px',
          color: isMusicEnabled ? 'white' : 'grey',
          zIndex: 1000,
        }}
        onClick={() => setIsMusicEnabled(!isMusicEnabled)}
      >
        {isMusicEnabled ? <MusicNoteIcon /> : <MusicOffIcon />} {/* Toggle icon based on music state */}
      </IconButton>

      {/* Sound Effects Toggle Button */}
      <IconButton
        sx={{
          position: 'fixed',
          top: '10px',
          right: '60px',
          color: isSoundEffectsEnabled ? 'white' : 'grey',
          zIndex: 1000,
        }}
        onClick={() => setIsSoundEffectsEnabled(!isSoundEffectsEnabled)}
      >
        {isSoundEffectsEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />} {/* Toggle icon based on sound state */}
      </IconButton>

      {/* Help Button (replacing the reset button) */}
      <IconButton
        sx={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          color: 'white',
          zIndex: 1000,
        }}
        onClick={handleHelpOpen}
      >
        <HelpOutlineIcon /> {/* "?" icon for game explanation */}
      </IconButton>

      {/* Help Dialog */}
      <Dialog open={helpOpen} onClose={handleHelpClose}>
        <DialogTitle>How to Play</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Happy Halloween! Welcome to Spooky's Potion Shop. Here's how to play the game:
          </Typography>
          <Typography variant="body1" sx={{ marginTop: '10px' }}>
            Click the cauldron to brew potions. The more cauldrons you have, the more potions you can brew per click. You can sell potions for gold and use gold to buy more cauldrons or hire witches to brew potions automatically.
          </Typography>
          <Typography variant="body1" sx={{ marginTop: '10px' }}>
            Keep brewing and selling potions to expand your shop!
          </Typography>
          <Button onClick={handleHelpClose} sx={{ marginTop: '20px' }}>Got it!</Button>
        </DialogContent>
      </Dialog>

      <Box sx={{ marginTop: '50px' }}>
        <PotionBrewer
          potions={potions}
          funds={funds}
          setFunds={setFunds}
          onBrew={handleBrew}
          onSell={handleSell}
          cauldrons={cauldrons}
          setCauldrons={setCauldrons}
          witchesHired={witchesHired}
          setWitchesHired={setWitchesHired}
          marketersHired={marketersHired}
          setMarketersHired={setMarketersHired}
        />
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
        }}
      >
        <CardMedia
          component="img"
          image={cauldronImage}
          alt="Cauldron"
          sx={{ width: cauldronSize, height: cauldronSize, cursor: 'pointer', transition: 'width 0.2s, height 0.2s' }}
          onClick={handleBrew}
        />
      </Box>
    </Container>
  );
}

export default App;