"use client";
import React, { useState } from "react";
import CharacterContext from "./CharacterContext";

export const CharacterProvider = ({ children }) => {
  const [character, setCharacter] = useState({
    /* initial character state */
  });

  // Function to update the character
  const updateCharacter = (newData) => {
    setCharacter((prevState) => ({ ...prevState, ...newData }));
  };

  return (
    <CharacterContext.Provider value={{ character, updateCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};
