import { useEffect, useState } from "react";
import SVG from "../SVG";
import { getAC } from "@/app/modules/CalculateAcItems";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { updateCharacterDB } from "@/app/modules/apiCalls";

function ArmorClass({ character, updateCharacter }) {
  const [armor, setArmor] = useState(character?.armorClass ?? 0);

  useEffect(() => {
    //console.log(character);
    if (character) {
      setArmor(character.armorClass ?? 0);
      //calculateAC();
      // console.log(character)
    }
  }, [character]);

  function updateArmor() {
    setArmor(event.target.value);
    character.armorClass = event.target.value;

    let update = {
      _id: character._id,
      update: {
        armorClass: event.target.value,
        updated_by: epochToUtcDateTime(),
      },
    };
    // update context i.e local
    //updateCharacter(character);
    // update database
    updateCharacterDB(update);
    //saveCharacterData(character, character.id);
    //console.log(character)
  }

  // update the characters AC, need to figure out how to update all components without infinity loop. i think i solved this?
  function calculateAC() {
    let newAc = [...(character?.actions ?? [])];
    let onlyAcItems = [];
    let calculateAC = 0;
    newAc.forEach((e, i) => {
      if (e.armor_class) {
        let ac = [e.armor_class, e.armor_category];

        onlyAcItems.push(ac);
      }
    });
    if (character.class) {
      let ac = getAC(newAc, onlyAcItems, calculateAC, character);
      character.armorClass = ac;
      setArmor(ac);

      let update = {
        _id: character._id,
        update: { armorClass: ac, updated_by: epochToUtcDateTime() },
      };
      // update context i.e local
      //updateCharacter(character);
      // update database
      updateCharacterDB(update);
      //saveCharacterData(character, character.id);
    }
  }

  return (
    <div className="card text-white grid gap-2 justify-items-center w-24 h-28 border-neonred border-2">
      <h4 className="h4-title">Armor</h4>
      <label className="relative group">
        <input
          onInput={updateArmor}
          type="text"
          value={armor}
          className="basic-input"
          placeholder="0"
        />
        <SVG />
      </label>
      <h4 className="h4-title">Class</h4>
    </div>
  );
}

export default ArmorClass;
