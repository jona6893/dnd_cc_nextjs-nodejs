import { useEffect, useState } from "react";
import SVG from "../ui_components/SVG";

import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { updateCharacterDB } from "@/app/modules/apiCalls";

function Proficiency({ character, updateCharacter }) {
  const [profic, setProfic] = useState(character?.proficiency ?? 0);

  useEffect(() => {
    if (character) {
      setProfic(character.proficiency ?? 0);
    }
  }, [character]);

  function updateProficiency() {
    setProfic(event.target.value);
    character.proficiency = event.target.value;

    let update = {
      _id: character._id,
      update: {
        proficiency: event.target.value,
        updated_by: epochToUtcDateTime(),
      },
    };
    // update context i.e local
    updateCharacter(character);
    // update database
    updateCharacterDB(update);
    //console.log(character);
  }
  return (
    <div className="card text-white flex justify-between items-center gap-2 justify-items-center w-[156px] h-14 border-neonred border-2">
      <h4 className="h4-title leading-tight">Proficiency Bonus</h4>
      <label className="relative group">
        <input
          onInput={updateProficiency}
          type="text"
          className="basic-input"
          value={profic === 0 ? "" : profic}
          placeholder="0"
        />
        <SVG />
      </label>
    </div>
  );
}

export default Proficiency;
