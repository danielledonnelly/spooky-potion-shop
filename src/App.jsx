import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Box,
  CardMedia,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline"; // Import Help Icon for "?"
import music from "./assets/music.mp3";
import cauldronClickSound from "./assets/cauldron-click.wav";
import Mascots from "./components/Mascots"; // Update to import Mascots
import PotionBrewer from "./components/PotionBrewer";
import cauldronImage from "./assets/cauldron.png";
import brewGuide from "./assets/brew-guide.png";
import Draggable from "react-draggable";

function App() {
  const [potions, setPotions] = useState(0);
  const [funds, setFunds] = useState(0);
  const [cauldrons, setCauldrons] = useState(1);
  const [witchesHired, setWitchesHired] = useState(0);
  const [marketersHired, setMarketersHired] = useState(0);
  const [cauldronSize, setCauldronSize] = useState(300);
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [isSoundEffectsEnabled, setIsSoundEffectsEnabled] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [sidekickAppear, setSidekickAppear] = useState(false);
  const [totalPotionsSold, setTotalPotionsSold] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const audioRef = useRef(null);
  const cauldronClickRef = useRef(null);

  useEffect(() => {
    // Set initial screen width to determine if it’s mobile
    setIsMobile(window.innerWidth <= 768);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  <Container sx={{ textAlign: "center", padding: "20px" }}>
    {isMobile ? (
      <Box
        sx={
          {
            // styles here
          }
        }
      >
        <Typography variant="h4" gutterBottom>
          This Game is Designed for PC
        </Typography>
        <Typography variant="body1">
          Spooky Potion Shop is best experienced on a desktop. Please switch to
          a PC for the full gameplay experience!
        </Typography>
      </Box>
    ) : (
      <>{/* Place the rest of your game components here */}</>
    )}
  </Container>;

  // Handle help dialog open and close
  const handleHelpOpen = () => setHelpOpen(true);
  const handleHelpClose = () => setHelpOpen(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("mascot", "dragging");
  };

  const handleDropOnCauldron = (e) => {
    const mascot = e.dataTransfer.getData("mascot");
    if (mascot === "dragging") {
      setDialogue("Please don't turn me into skeleton soup!"); // Trigger dialogue
      setMascotImage("skeleton-jump"); // Change mascot image
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

  // Function to handle potion brewing
  const handleBrew = (amount = 1, isPlayerInitiated = false) => {
    setPotions((prev) => prev + amount);
    setCauldronSize((prev) => prev + 10); // Slightly increase the cauldron size
    setTimeout(() => setCauldronSize(300), 200); // Reset cauldron size after 200ms

    if (
      isPlayerInitiated &&
      isSoundEffectsEnabled &&
      cauldronClickRef.current
    ) {
      cauldronClickRef.current.currentTime = 0; // Reset the sound to the beginning
      cauldronClickRef.current.play(); // Play the click sound
    }
  };

  // Function to handle selling potions
  const handleSell = (potionCount, pricePerPotion) => {
    setPotions((prevPotions) => {
      const actualPotionsToSell = Math.min(potionCount, prevPotions); // Ensure you can't sell more than you have
      return Math.max(prevPotions - actualPotionsToSell, 0); // Decrease potions by the number sold
    });

    setFunds((prevFunds) => {
      const actualFundsToAdd = potionCount * pricePerPotion;
      return prevFunds + actualFundsToAdd;
    });

    setTotalPotionsSold(
      (prevTotal) => prevTotal + Math.min(potionCount, potions)
    ); // Increment total potions sold
  };

  return (
    <Container sx={{ textAlign: "center", padding: "20px" }}>
      {/* Updated to use Mascots component */}
      <Mascots isSidekickVisible={sidekickAppear} />

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
          position: "fixed",
          top: "10px",
          right: "100px",
          color: isMusicEnabled ? "white" : "grey",
          className: "option-button",
        }}
        onClick={() => setIsMusicEnabled(!isMusicEnabled)}
      >
        {isMusicEnabled ? <MusicNoteIcon /> : <MusicOffIcon />}
      </IconButton>

      {/* Sound Effects Toggle Button */}
      <IconButton
        sx={{
          position: "fixed",
          top: "10px",
          right: "60px",
          color: isSoundEffectsEnabled ? "white" : "grey",
          zIndex: 1000,
        }}
        onClick={() => setIsSoundEffectsEnabled(!isSoundEffectsEnabled)}
      >
        {isSoundEffectsEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
      </IconButton>

      {/* Help Button */}
      <IconButton
        sx={{
          position: "fixed",
          top: "10px",
          right: "10px",
          color: "white",
          zIndex: "1000",
          className: "option-button"
        }}
        onClick={handleHelpOpen}
      >
        <HelpOutlineIcon />
      </IconButton>

      {/* Help Dialog */}
      <Dialog
        open={helpOpen}
        onClose={handleHelpClose}
        fullWidth={true}
        maxWidth="md"
        PaperProps={{
          sx: {
            width: "666px !important",
            top: "-66px",
            backgroundColor: "var(--black)",
            color: "var(--white)",
            boxShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
            border: "2px solid var(--purple)",
          },
        }}
      >
        <DialogContent sx={{ overflow: "hidden", maxHeight: "100%" }}>
          <Typography variant="body1">
            Spooky Potion Shop is a short idle clicker game. It can run in the
            background if you switch tabs, but be careful! If you reload or
            close the page, your progress will reset.
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CardMedia
              component="img"
              image={brewGuide}
              alt="Brew Guide"
              sx={{ maxWidth: "100%", borderRadius: "10px" }}
            />
          </Box>
        </DialogContent>
      </Dialog>

      <Box sx={{ marginTop: "50px" }}>
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
          setSidekickAppear={setSidekickAppear}
          totalPotionsSold={totalPotionsSold}
          setTotalPotionsSold={setTotalPotionsSold}
        />
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
        }}
      >
        <CardMedia
          component="img"
          image={cauldronImage}
          alt="Cauldron"
          className="cauldron"
          sx={{
            width: cauldronSize,
            height: cauldronSize,
            cursor: "pointer",
            transition: "width 0.2s, height 0.2s",
          }}
          onClick={() => handleBrew(cauldrons, true)}
          onDrop={handleDropOnCauldron}
          onDragOver={(e) => e.preventDefault()}
        />
      </Box>
    </Container>
  );
}

export default App;
