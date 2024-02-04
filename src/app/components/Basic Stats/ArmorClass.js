
import { useEffect, useState } from "react";
import SVG from "../SVG";
import { saveCharacterData } from "@/app/modules/ElectronSaves";
import { getAC } from "@/app/modules/CalculateAcItems";


function ArmorClass({character}) {
  const [armor, setArmor] = useState(character?.armorClass ?? 0);
  

  useEffect(() => {
    if (character) {
      setArmor(character.armorClass ?? 0);
      calculateAC();
     // console.log(character)
    }
  }, [character]);

  function updateArmor() {
    setArmor(event.target.value);
    character.armorClass = event.target.value;

    saveCharacterData(character, character.id);
    //console.log(character)
  }

  // update the characters AC, need to figure out how to update all components without infinity loop. i think i solved this?
  function calculateAC(){
    let newAc = [...character?.actions ?? []]
    let onlyAcItems = []
    let calculateAC = 0;
    newAc.forEach((e,i)=>{
     if(e.armor_class){
       let ac = [e.armor_class, e.armor_category]

       onlyAcItems.push(ac)
 
     }
    })
    if(character.class){
      let ac = getAC(newAc, onlyAcItems, calculateAC, character);
      character.armorClass = ac
      setArmor(ac)
     
      saveCharacterData(character, character.id);
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

export default ArmorClass