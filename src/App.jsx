import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, CardMedia, IconButton } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp'; // Icon for sound on
import VolumeOffIcon from '@mui/icons-material/VolumeOff'; // Icon for sound off
import music from './assets/music.mp3'; // Background music
import cauldronClickSound from './assets/cauldron-click.wav'; // Cauldron click sound
import Mascot from './components/Mascot';
import PotionBrewer from './components/PotionBrewer';
import cauldronImage from './assets/cauldron.png';

function App() {
  // Load state from local storage if available
  const [potions, setPotions] = useState(() => Number(localStorage.getItem('potions')) || 0);
  const [funds, setFunds] = useState(() => Number(localStorage.getItem('funds')) || 0);
  const [cauldronSize, setCauldronSize] = useState(300);
  const [cauldrons, setCauldrons] = useState(() => Number(localStorage.getItem('cauldrons')) || 1);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true); // Sound state (music + sound effects)

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('potions', potions);
    localStorage.setItem('funds', funds);
    localStorage.setItem('cauldrons', cauldrons);
  }, [potions, funds, cauldrons]);

  // References to audio elements
  const audioRef = useRef(null);
  const cauldronClickRef = useRef(null);

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

  const handleBrew = () => {
    setPotions((prev) => prev + cauldrons);
    setCauldronSize((prev) => prev + 10);
    setTimeout(() => setCauldronSize(300), 200);

    if (isSoundEnabled && cauldronClickRef.current) {
      cauldronClickRef.current.currentTime = 0;
      cauldronClickRef.current.play();
    }
  };

  const handleSell = (potionCount, pricePerPotion) => {
    setFunds((prev) => prev + potionCount * pricePerPotion);
    setPotions((prev) => Math.max(prev - potionCount, 0));
  };

  return (
    <Container sx={{ textAlign: 'center', padding: '20px' }}>
      {/* Mascot with Dialogue */}
      <Mascot />

      {/* Hidden Audio Elements */}
      <audio ref={audioRef} loop autoPlay muted={!isSoundEnabled}>
        <source src={music} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Audio for Cauldron Click Sound */}
      <audio ref={cauldronClickRef}>
        <source src={cauldronClickSound} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      {/* Sound Effects and Music Toggle Button */}
      <IconButton
        sx={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          color: isSoundEnabled ? 'white' : 'grey',
          zIndex: 1000,
        }}
        onClick={toggleSound}
      >
        {isSoundEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
      </IconButton>

      {/* Move the Potion Brewer (Main Game UI) down */}
      <Box sx={{ marginTop: '50px' }}>
        <PotionBrewer
          potions={potions}
          funds={funds}
          setFunds={setFunds}
          onBrew={handleBrew}
          onSell={handleSell}
          cauldrons={cauldrons}
          setCauldrons={setCauldrons}
        />
      </Box>

      {/* Cauldron image for brewing potions */}
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
          sx={{
            width: cauldronSize,
            height: cauldronSize,
            cursor: 'pointer',
            transition: 'width 0.2s, height 0.2s',
          }}
          onClick={handleBrew} // Brew potions based on the number of cauldrons
        />
      </Box>
    </Container>
  );
}

export default App;