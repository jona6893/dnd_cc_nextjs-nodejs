import { nanoid } from "nanoid";
import SVG from "../SVG";
import { useEffect, useState } from "react";
import { saveCharacterData } from "@/app/modules/ElectronSaves";


function SavingThrows({character}) {
  const defaultSavingThrows = {
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    wis: 0,
    cha: 0,
  };
  const [savingThrow, setSavingThrow] = useState(character?.savingThrow ?? defaultSavingThrows);
  
  useEffect(() => {
    setSavingThrow(character?.savingThrow ?? defaultSavingThrows);
    //console.log(character.savingThrow)
  }, [character]);

  const stats = [
    "str",
    "dex",
    "con",
    "int",
    "wis",
    "cha",
  ];

function updatSavingThrow(stat,value){
  if(!character.savingThrow){
    //console.log("does not exist")
    character.savingThrow = defaultSavingThrows
  }
        setSavingThrow(prev => ({
      ...prev,
      [stat]: value
    }));
    
    // character.savingThrows = [...character.savingThrows, { [stat]: value }];
    character.savingThrow[stat] = value
    saveCharacterData(character, character.id);
  }

  return (
    <div className="card text-white flex flex-col justify-between items-center gap-2 justify-items-center w-80 h-28 border-neonred border-2">
      <div className="grid grid-cols-3 justify-items-center w-full">
        {stats.map((stat, index) => (
          <label
            key={stat}
            className="flex h4-title items-end justify-center w-fit relative group"
          >
            {stat}
            <input
              onInput={(e) => updatSavingThrow(stat, e.target.value)}
              type="text"
              className="basic-input"
              value={savingThrow[stat] === 0 ? "" : savingThrow[stat]}
              placeholder="0"
            />
            <SVG />
          </label>
        ))}
      </div>
      <h3 className="h3-title">SAVING THROW</h3>
    </div>
  );
}

export default SavingThrows