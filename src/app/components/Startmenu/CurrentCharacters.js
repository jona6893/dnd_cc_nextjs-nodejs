import CharacterContext from "@/app/context/CharacterContext";
import {
  compareByCharacterName,
  exportCharacterData,
} from "@/app/modules/ElectronSaves";
import { deleteCharacter, getUserCharacters } from "@/app/modules/apiCalls";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useContext } from "react";
import DeletePrompt from "../ui_components/modals/DeletePrompt";

function CurrentCharacters({ userInfo }) {
  const [allCharacter, setAllCharacter] = useState([]);
  const [selCharacter, setSelCharacter] = useState([]);
  const { character, updateCharacter } = useContext(CharacterContext);
  const [ExportCharacter, setExportCharacter] = useState("");
  const [deletePrompt, setDeletePrompt] = useState({ value: false, _id: "" });

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

  function handleSubmit(characterId) {
    let selected;
    allCharacter.forEach((e) => {
      if (e._id === characterId) {
        selected = e;
      }
    });
    // update character context provider
    updateCharacter(selected);
  }

  async function handleDeleteCharacter(_id) {
    //console.log(_id)
    const deleted = await deleteCharacter(_id);
    if (deleted?.message) {
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
            className="flex group gap-2 text-white bg-neongreen/10 border-neongreen border p-1 rounded w-full relative"
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
            <div className="md:hidden max-md:flex group-hover:flex md:gap-2 max-md:gap-1 absolute top-0 left-0 p-1 w-full h-full items-center justify-center  max-md:flex-col max-md:items-end md:bg-overlay/40">
              <button
                onClick={() => handleSubmit(cha._id)}
                className="bg-neongreen hover:bg-green-400 px-6 py-1 rounded min-w-28"
              >
                Play
              </button>
              <button
                onClick={() => {
                  let newState = { ...deletePrompt };
                  newState.value = !deletePrompt.value;
                  newState._id = cha._id;
                  setDeletePrompt(newState);
                }}
                className="bg-neonred hover:bg-red-400 px-6 py-1 rounded min-w-28"
              >
                Delete
              </button>
            </div>
            {deletePrompt.value && (
              <DeletePrompt
                modal={deletePrompt}
                setModal={setDeletePrompt}
                deleteFunction={handleDeleteCharacter}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default CurrentCharacters;
