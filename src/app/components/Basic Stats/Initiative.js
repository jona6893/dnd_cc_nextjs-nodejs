import { useEffect, useState } from "react";
import SVG from "../SVG";
import { saveCharacterData } from "@/app/modules/ElectronSaves";


function Initiative({character}) {
  const [ini, setIni] = useState(character?.initiative ?? 0);

  useEffect(() => {
    if (character) {
      setIni(character.initiative ?? 0);
    }
  }, [character]);

  function updateInitiative() {
    setIni(event.target.value);
    character.initiative = event.target.value;

    saveCharacterData(character, character.id);
    console.log(character)
  }

  return (
    <div className="card text-white flex flex-col items-center justify-end gap-2 w-24 h-28 border-neonred border-2">
      <label className="relative group">
        <input onInput={updateInitiative} type="text" value={ini === 0 ? "":ini} className="basic-input" placeholder="0" />
        <SVG />
      </label>
      <h4 className="h4-title">Initiative</h4>
    </div>
  );
}

export default Initiative

