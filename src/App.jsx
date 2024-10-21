// Happy Halloween!
// The direction of this game has changed a few times as I've figured out what I want to do with it.
// At first, you could hire marketers to auto sell potions. There was also saving implemented using local storage.
// I quickly realized that I'd rather keep this as a relatively simple minimalist game, the kind you can complete in one sitting.
// So if you see some commented out logic for features that aren't in the game, that's why.
// I hope you enjoy playing! Happy brewing!

import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, CardMedia, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff'; // Import MusicOffIcon
import RestartAltIcon from '@mui/icons-material/RestartAlt'; // Import Restart Icon
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

  const audioRef = useRef(null);
  const cauldronClickRef = useRef(null);

  // Reset game to initial state
  const resetGame = () => {
    if (window.confirm("Are you sure you want to restart the game? All progress will be lost!")) {
      setPotions(0);
      setFunds(0);
      setCauldrons(1);
      setWitchesHired(0);
      setMarketersHired(0);
      // Commented out clearing localStorage
      // localStorage.clear(); // Clear localStorage for a fresh start
      console.log("Game reset!");
    }
  };

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

  // Saving to localStorage
  // Removed because I don't want the game to save; reloading should reset everything. This is not a long-term game.
  // useEffect(() => {
  //   localStorage.setItem('potions', potions);
  //   localStorage.setItem('funds', funds);
  //   localStorage.setItem('cauldrons', cauldrons);
  //   localStorage.setItem('witchesHired', witchesHired);
  //   localStorage.setItem('marketersHired', marketersHired);
  //   localStorage.setItem('isMusicEnabled', JSON.stringify(isMusicEnabled));
  //   localStorage.setItem('isSoundEffectsEnabled', JSON.stringify(isSoundEffectsEnabled));
  // }, [potions, funds, cauldrons, witchesHired, marketersHired, isMusicEnabled, isSoundEffectsEnabled]);

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

      {/* Reset Game Button */}
      <IconButton
        sx={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          color: 'red',
          zIndex: 1000,
        }}
        onClick={resetGame}
      >
        <RestartAltIcon /> {/* Icon for reset/restart */}
      </IconButton>

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