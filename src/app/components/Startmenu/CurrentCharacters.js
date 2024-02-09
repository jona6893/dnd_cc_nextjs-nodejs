import CharacterContext from "@/app/context/CharacterContext";
import {
  compareByCharacterName,
  exportCharacterData,
} from "@/app/modules/ElectronSaves";
import { deleteCharacter, getUserCharacters } from "@/app/modules/apiCalls";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useContext } from "react";

function CurrentCharacters({ userInfo }) {
  const [allCharacter, setAllCharacter] = useState([]);
  const [selCharacter, setSelCharacter] = useState([]);
  const { character, updateCharacter } = useContext(CharacterContext);
  const [ExportCharacter, setExportCharacter] = useState("");

 
  useEffect(() => {
      const fetchData = async () => {
        try {
          if (userInfo?.id) {
            //console.log(userInfo);
            const characters = await getUserCharacters(userInfo); // Wait for the Promise to resolve
            setAllCharacter(characters);
          }
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };
      fetchData();
  }, [userInfo]);

  function handleSubmit(characterId){
    let selected;
    allCharacter.forEach(e=>{
      if(e._id === characterId){
        selected = e
      }
    })
    // update character context provider
    updateCharacter(selected)
  }

 async function handleDeleteCharacter(_id){
  //console.log(_id)
  const deleted = await deleteCharacter(_id);
  if(deleted?.message){
    const characters = await getUserCharacters(userInfo);
    setAllCharacter(characters);
  }
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
                onClick={() => handleSubmit(cha._id)}
                className="bg-neongreen hover:bg-green-400 px-6 py-1 rounded"
              >
                Play
              </button>
              <button
                onClick={() => handleDeleteCharacter(cha._id)}
                className="bg-neonred hover:bg-red-400 px-6 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CurrentCharacters;
