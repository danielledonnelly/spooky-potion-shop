import React, { useState, useEffect } from "react";
import { CardMedia, Box, Typography } from "@mui/material";
import skeletonDefault from "../assets/skeleton-default.png";
import skeletonWitch from "../assets/skeleton-witch.png";
import skeletonBlush from "../assets/skeleton-blush.png";
import skeletonJump from "../assets/skeleton-jump.png";
import witchDefault from "../assets/witch-default.png";
import witchBroom from "../assets/witch-broom.png";
import witchStar from "../assets/witch-star.png";

const Mascots = ({ isSidekickVisible }) => {
  // Mascot state
  const [mascotDialogueIndex, setMascotDialogueIndex] = useState(0);
  const [mascotImage, setMascotImage] = useState(skeletonDefault);
  const [mascotDialogue, setMascotDialogue] = useState(
    "Hello and happy Halloween! Welcome to Spooky's Potion Shop."
  );
  const [dragDialogue, setDragDialogue] = useState(null); // State for drag-specific dialogue

  // Sidekick state
  const [sidekickDialogueIndex, setSidekickDialogueIndex] = useState(0);
  const [sidekickImage, setSidekickImage] = useState(witchDefault);

  // Mascot dialogue lines
  const mascotDialogueLines = [
    "Hello and happy Halloween! Welcome to Spooky's Potion Shop.",
    "I've never seen a skeleton wearing a skin suit before! Where did you get it?",
    "Huh, what's that? You're a human?! My mistake! You must be the new manager, then.",
    "My name is Spooky S. Skeleton, and I'm the owner of this shop!", 
    "It's a little bare-bones now, but with your help, this place will be crawling with customers!",
    "Click the cauldron a few times to brew some potions. Then, when you're ready, click the SELL POTIONS button.",
    "Each potion sells for one gold!  You can use gold to brew potions faster.",
    "Buying a cauldron will increase the number of potions brewed per batch.",
    "If you have ten cauldrons, then every click will brew ten potions!",
    "To speed things up even more and automate the process, you can hire a witch.",
    "We can get into the details on how that works later. For now...",
    "Get brewing!",
    "‎", // When I just put in a space, the bar collapses, but this allows there to be a blank space at the end of the dialogue without changing the dialogue bar
  ];

  // Sidekick dialogue lines
  const sidekickDialogueLines = [
    "Greetings, young apprentice!",
    "I'm here to assist with your potion brewing. Let's speed things up!",
    "I'll brew a batch of potions every second. And if you hire more witches, they can each do the same!",
    "Now let's get brewing and make some magic!",
    "‎", // When I just put in a space, the bar collapses, but this allows there to be a blank space at the end of the dialogue without changing the dialogue bar
  ];

  // Progress mascot dialogue
  const progressMascotDialogue = () => {
    if (mascotDialogueIndex < mascotDialogueLines.length - 1) {
      setMascotDialogueIndex((prevIndex) => prevIndex + 1);
      setMascotDialogue(mascotDialogueLines[mascotDialogueIndex + 1]);
    }
  };

  // Progress sidekick dialogue
  const progressSidekickDialogue = () => {
    if (sidekickDialogueIndex === 0) {
      setMascotImage(skeletonDefault); // Reset skeleton to default on first sidekick dialogue click
    }
    if (sidekickDialogueIndex < sidekickDialogueLines.length - 1) {
      setSidekickDialogueIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Update mascot image based on dialogue
  useEffect(() => {
    switch (mascotDialogueIndex) {
      case 1:
        setMascotImage(skeletonBlush);
        break;
      case 2:
        setMascotImage(skeletonJump);
        break;
      case 3:
        setMascotImage(skeletonWitch);
        break;
      case 4: 
        setMascotImage(skeletonBlush);
        break;
      case 6:
        setMascotImage(skeletonJump);
        break;
      case 9:
        setMascotImage(skeletonWitch);
        break;
      case 11:
          setMascotImage(skeletonJump);
          break;
      default:
        setMascotImage(skeletonDefault);
    }
  }, [mascotDialogueIndex]);

  useEffect(() => {
    if (isSidekickVisible) {
      setMascotImage(skeletonJump); // Make mascot jump when sidekick appears
      setSidekickImage(witchDefault); // Show sidekick's default image
      setSidekickDialogueIndex(0); // Reset sidekick dialogue index
    } else {
      setMascotImage(skeletonDefault); // Reset to default if sidekick is not visible
    }
  }, [isSidekickVisible]);

  // Update sidekick image based on dialogue
  useEffect(() => {
    switch (sidekickDialogueIndex) {
      case 1:
        setSidekickImage(witchBroom);
        break;
      case 2:
        setSidekickImage(witchStar);
        break;
      default:
        setSidekickImage(witchDefault);
    }
  }, [sidekickDialogueIndex]);

  // Drag start handler to mark mascot as draggable
  const handleDragStart = (e) => {
    e.dataTransfer.setData("mascot", "dragging");
  };

  // Drop handler for mascot dragged onto cauldron
  const handleDropOnCauldron = (e) => {
    const mascot = e.dataTransfer.getData("mascot");
    if (mascot === "dragging") {
      setDragDialogue("Please don't turn me into skeleton soup!");
      setMascotImage(skeletonJump);
    }
  };

  useEffect(() => {
    // Add event listener to cauldron for handling mascot drop
    const cauldron = document.querySelector(".cauldron");
    if (cauldron) {
      cauldron.addEventListener("drop", handleDropOnCauldron);
      cauldron.addEventListener("dragover", (e) => e.preventDefault()); // Allow dropping

      return () => {
        cauldron.removeEventListener("drop", handleDropOnCauldron);
        cauldron.removeEventListener("dragover", (e) => e.preventDefault());
      };
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {/* Mascot Section */}
      <div className="mascot" draggable onDragStart={handleDragStart}>
        <CardMedia
          component="img"
          image={mascotImage}
          alt="Mascot"
          className="mascot-image"
        />
      </div>

      {/* Sidekick Section (only render if isSidekickVisible is true) */}
      {isSidekickVisible && (
        <div className="sidekick">
          <CardMedia
            component="img"
            image={sidekickImage}
            alt="Sidekick"
            className="sidekick-image"
          />
        </div>
      )}

      {/* Shared Dialogue Box */}
      <Box
        className="dialogue"
        sx={{
          position: "fixed",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)", 
          backgroundColor: "var(--black)",
          color: dragDialogue || !isSidekickVisible ? "#fff" : "#B664AA",
          padding: "15px 50px",
          borderRadius: "10px",
          width: "80%",
          textAlign: "center",
          cursor: "pointer",
          zIndex: "10"
        }}
        onClick={() => {
          if (dragDialogue) {
            setDragDialogue(null);
            setMascotImage(skeletonDefault);
          } else {
            isSidekickVisible ? progressSidekickDialogue() : progressMascotDialogue();
          }
        }}
      >
        <Typography variant="h6">
          {dragDialogue || (isSidekickVisible
            ? sidekickDialogueLines[sidekickDialogueIndex]
            : mascotDialogue)}
        </Typography>
      </Box>
    </div>
  );
};

export default Mascots;