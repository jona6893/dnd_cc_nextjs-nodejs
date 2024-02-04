import CharacterContext from "@/app/context/CharacterContext";
import {
  listCharacters,
  loadCharacterData,
  deleteCharacterData,
  compareByCharacterName,
  exportCharacterData,
} from "@/app/modules/ElectronSaves";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useContext } from "react";

function CurrentCharacters() {
  const [allCharacter, setAllCharacter] = useState([]);
  const [selCharacter, setSelCharacter] = useState([]);
  const { character, updateCharacter } = useContext(CharacterContext);
  const [ExportCharacter, setExportCharacter] = useState("");


  
    function handleExport(id){
      exportCharacterData(id)
    }


  return (
    <div className="flex flex-col w-full gap-2">
      {allCharacter?.sort(compareByCharacterName).map((cha) => {
        return (
          <div
            key={nanoid()}
            className="flex group gap-2 text-white bg-neongreen/10 border-neongreen border rounded w-full relative"
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAnZtMGC_ZtzdY-K2fMuRHKqcn0cynDuLgt7HtyeTIz5gL6rh8EWo1_T-iYt6cCEVlUGQ&usqp=CAU"
              alt=""
              className="w-16 h-16 aspect-square object-cover object-center"
            />
            <div className="grid grid-rows-2 gap-x-2 text-sm">
              <h3 className="text-base col-span-2">{cha.name}</h3>
              <p className="">Class: {cha.class}</p>
              <p className="">lvl: {cha.level}</p>
              <p className="">Race: {cha.race}</p>
            </div>
            <div className="hidden group-hover:flex gap-2 absolute w-full h-full items-center justify-center bg-overlay/40">
              <button
                onClick={() => handleSubmit(cha.id)}
                className="bg-neongreen hover:bg-green-400 px-6 py-1 rounded"
              >
                Play
              </button>
              <button
                onClick={() => handleDelete(cha.id)}
                className="bg-neonred hover:bg-red-400 px-6 py-1 rounded"
              >
                Delete
              </button>
              <button onClick={() => handleExport(cha.id)}>Export</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CurrentCharacters;
