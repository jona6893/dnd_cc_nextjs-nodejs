import { updateCharacterDB } from "../modules/apiCalls";
import { epochToUtcDateTime } from "../modules/getCurrentDate";
import SVG from "./ui_components/SVG";
import { useEffect, useState } from "react";

function CharacterDetails({ character, updateCharacter }) {
  const [characterInfo, setCharacterInfo] = useState({
    name: "",
    race: "",
    class: "",
    subClass: "",
    alignment: "",
    level: "",
    xp: "",
  });

  useEffect(() => {
    if (character) {
      setCharacterInfo({
        name: character.name,
        race: character.race,
        class: character.class,
        subClass: character.subClass,
        alignment: character.alignment,
        level: character.level,
        xp: character.xp,
      });
    }
  }, [character]);

  function updateDetails(key, value) {
    let newState = { ...characterInfo };
    newState[key] = value;
    setCharacterInfo(newState);
    character[key] = value;

    let update = {
      _id: character._id,
      update: Object.assign(newState, { updated_by: epochToUtcDateTime() }),
    };
    // update context i.e local
    updateCharacter(character);
    // update database
    updateCharacterDB(update);
  }

  return (
    <div className="sm:w-80 grid grid-cols-2 bg-overlay text-white p-4 rounded-md border-neonyellow border-2 h-full">
      <div className="font-almendra">
        <h2
          //onInput={() => console.log("hello")}
          className="text-lg relative group w-max"
        >
          <input
            className="bg-transparent"
            type="text"
            value={characterInfo?.name ? characterInfo.name : "name"}
            onInput={(e) => updateDetails("name", e.target.value)}
          />

          <SVG />
        </h2>
        <h3 className="text-md relative group w-fit">
          <input
            className="bg-transparent"
            type="text"
            value={characterInfo?.race ? characterInfo.race : "race"}
            onInput={(e) => updateDetails("race", e.target.value)}
          />

          <SVG />
        </h3>
        <h3 className="text-md relative group w-fit">
          <input
            className="bg-transparent"
            type="text"
            value={characterInfo?.class ? characterInfo.class : "class"}
            onInput={(e) => updateDetails("class", e.target.value)}
          />
          <SVG />
        </h3>
        <h4 className="h4-title relative group w-fit">
          <input
            className="bg-transparent"
            type="text"
            value={
              characterInfo?.subClass ? characterInfo.subClass : "subclass"
            }
            onInput={(e) => updateDetails("subClass", e.target.value)}
          />

          <SVG />
        </h4>
        <h4 className="h4-title relative group w-fit">
          <input
            className="bg-transparent"
            type="text"
            value={characterInfo?.alignment ? characterInfo.alignment : "none"}
            onInput={(e) => updateDetails("alignment", e.target.value)}
          />
          <SVG />
        </h4>
      </div>
      <div className="flex flex-col justify-between items-end">
        <div className="relative group">
          <input
            className="basic-input"
            type="text"
            value={characterInfo?.level ? characterInfo.level : ""}
            placeholder="0"
            onInput={(e) => updateDetails("level", e.target.value)}
          />
          <SVG />
        </div>
        <label
          htmlFor=""
          className="flex flex-col items-center gap-2 text-sm relative group"
        >
          <input
            className="basic-input"
            type="text"
            value={characterInfo?.xp ? characterInfo.xp : ""}
            placeholder="0"
            onInput={(e) => updateDetails("xp", e.target.value)}
          />
          XP
          <SVG />
        </label>
      </div>
    </div>
  );
}

export default CharacterDetails;
