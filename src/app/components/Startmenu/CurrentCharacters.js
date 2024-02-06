import CharacterContext from "@/app/context/CharacterContext";
import {
  compareByCharacterName,
  exportCharacterData,
} from "@/app/modules/ElectronSaves";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useContext } from "react";

function CurrentCharacters({ userInfo }) {
  const [allCharacter, setAllCharacter] = useState([]);
  const [selCharacter, setSelCharacter] = useState([]);
  const { character, updateCharacter } = useContext(CharacterContext);
  const [ExportCharacter, setExportCharacter] = useState("");

  async function getUserCharacters() {
    const apiUrl = "http://62.198.182.210:8081/api/get-characters";
    const apiKey = "myapikey";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify({ userId: userInfo.id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data received:", data);
      setAllCharacter(data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return false;
    }
  }
  useEffect(() => {
    if (userInfo?.id) {
      console.log(userInfo);
      getUserCharacters()
    }
  }, [userInfo]);

  function handleSubmit(characterId){
    let selected;
    allCharacter.forEach(e=>{
      if(e._id === characterId){
        selected = e
      }
    })
    
    console.log(selected)
    console.log(characterId)
    console.log(allCharacter)
    updateCharacter(selected)
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
                onClick={() => handleDelete(cha._id)}
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
