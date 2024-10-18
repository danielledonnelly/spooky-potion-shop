import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, CardMedia, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import music from './assets/music.mp3'; 
import cauldronClickSound from './assets/cauldron-click.wav'; 
import Mascot from './components/Mascot';
import PotionBrewer from './components/PotionBrewer';
import cauldronImage from './assets/cauldron.png';
import './index.css';

function App() {
  const [potions, setPotions] = useState(0); // Track potion count
  const [funds, setFunds] = useState(0); // Track funds
  const [cauldronSize, setCauldronSize] = useState(300); // Cauldron size
  const [cauldrons, setCauldrons] = useState(1); // Track cauldron count
  const [isSoundEnabled, setIsSoundEnabled] = useState(true); // Track sound state (music + sound effects)

  // Load saved game state from localStorage
  useEffect(() => {
    const savedFunds = localStorage.getItem('funds');
    const savedCauldrons = localStorage.getItem('cauldrons');
    const savedPotions = localStorage.getItem('potions');
    
    if (savedFunds !== null) setFunds(Number(savedFunds));
    if (savedCauldrons !== null) setCauldrons(Number(savedCauldrons));
    if (savedPotions !== null) setPotions(Number(savedPotions));
  }, []);

  // Save game state to localStorage whenever values change
  useEffect(() => {
    localStorage.setItem('funds', funds);
    localStorage.setItem('cauldrons', cauldrons);
    localStorage.setItem('potions', potions);
  }, [funds, cauldrons, potions]);

  // Sound control logic
  const audioRef = useRef(null); // Background music reference
  const cauldronClickRef = useRef(null); // Cauldron click sound reference

  // Adjust volume and play music when it's ready
  useEffect(() => {
    if (audioRef.current && isSoundEnabled) {
      audioRef.current.volume = 0.2;
      audioRef.current.play();
    }
  }, [isSoundEnabled]);

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);

    if (audioRef.current) {
      if (isSoundEnabled) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  // Brewing logic
  const handleBrew = () => {
    setPotions((prev) => prev + cauldrons);
    setCauldronSize((prev) => prev + 10);
    setTimeout(() => setCauldronSize(300), 200);

    if (isSoundEnabled && cauldronClickRef.current) {
      cauldronClickRef.current.currentTime = 0;
      cauldronClickRef.current.play();
    }
  };

  // Selling logic
  const handleSell = (potionCount, pricePerPotion) => {
    setFunds((prev) => prev + potionCount * pricePerPotion);
    setPotions((prev) => Math.max(prev - potionCount, 0));
  };

  // App Container
  return (
    <Container sx={{ textAlign: 'center', padding: '20px' }}>
      <Mascot />

      <audio ref={audioRef} loop autoPlay muted={!isSoundEnabled}>
        <source src={music} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <audio ref={cauldronClickRef}>
        <source src={cauldronClickSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <IconButton
        sx={{ position: 'fixed', top: '10px', right: '10px', color: isSoundEnabled ? 'white' : 'grey', zIndex: 1000 }}
        onClick={toggleSound}
      >
        {isSoundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
      </IconButton>

    {/* PotionBrewer Box & PotionBrewer */}
      <Box sx={{ marginTop: '50px' }}>
        <PotionBrewer
          potions={potions}
          setPotions={setPotions}
          funds={funds}
          setFunds={setFunds}
          onBrew={handleBrew}
          onSell={handleSell}
          cauldrons={cauldrons}
          setCauldrons={setCauldrons}
        />
      </Box>

      {/* Cauldron Box & Cauldron */}
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