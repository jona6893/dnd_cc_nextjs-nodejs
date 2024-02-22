import { useContext, useEffect, useState } from "react";
import Spells from "./spells/Spells";
import Actions from "./actions/Actions";
import Extras from "./extras/Extras";
import Descriptions from "./descriptions/Descriptions";
import FeatureAndTraits from "./featureAndTraits/FeatureAndTraits";
import CharacterContext from "@/app/context/CharacterContext";

import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { updateCharacterDB } from "@/app/modules/apiCalls";
import SVG from "../SVG";

function SpellsMenu() {
  const [menuBtn, setMenuBtn] = useState(0);
  const [popup, setPopup] = useState(false);
  const { character, updateCharacter } = useContext(CharacterContext);
  const [spellStats, setSpellStats] = useState(
    character?.spellStats ?? { modifier: 0, spellAttack: 0, saveDC: 0 }
  );
  const selBtn = "border-neonpurple-500 border rounded";

  useEffect(() => {
    setSpellStats(
      character?.spellStats ?? { modifier: 0, spellAttack: 0, saveDC: 0 }
    );
    //console.log(character.savingThrow)
  }, [character]);

  function updatSpellStat(stat, value) {
    let newstat = { ...spellStats };

    newstat[stat] = parseInt(value);

    setSpellStats(newstat);

    character.spellStats = newstat;

    let update = {
      _id: character._id,
      update: {
        spellStats: newstat,
        updated_by: epochToUtcDateTime(),
      },
    };
    // update context i.e local
    updateCharacter(character);
    // update database
    updateCharacterDB(update);
  }

  return (
    <section className=" sm:w-[600px] min-w-[380px] max-sm:w-full card flex flex-col max-h-[500px]">
      <div className="grid grid-cols-2 w-full justify-between items-center">
        <ul className="flex items-center gap-2 h4-title w-full col-span-2 sm:justify-evenly overflow-auto">
          <li>
            <button
              onClick={() => setMenuBtn(0)}
              className={`px-2 py-1 ${
                menuBtn === 0 ? selBtn : "border-transparent"
              } border `}
            >
              ACTIONS
            </button>
          </li>
          <li>
            <button
              onClick={() => setMenuBtn(1)}
              className={`px-2 py-1 ${
                menuBtn === 1 ? selBtn : "border-transparent"
              } border`}
            >
              SPELLS
            </button>
          </li>
          <li>
            <button
              onClick={() => setMenuBtn(2)}
              className={`px-2 py-1 ${
                menuBtn === 2 ? selBtn : "border-transparent"
              } border `}
            >
              EXTRA
            </button>
          </li>
          <li>
            <button
              onClick={() => setMenuBtn(3)}
              className={`px-2 py-1 ${
                menuBtn === 3 ? selBtn : "border-transparent"
              } border `}
            >
              DESCRIPTIONS
            </button>
          </li>
          <li>
            <button
              onClick={() => setMenuBtn(4)}
              className={`px-2 py-1 ${
                menuBtn === 4 ? selBtn : "border-transparent"
              } border `}
            >
              FEATURES & TRAITS
            </button>
          </li>
        </ul>
        {menuBtn === 1 && (
          <div className="flex gap-2 justify-between text-white w-full row-start-2 col-span-2 mx-auto ">
            <label
              htmlFor=""
              className="flex flex-col items-center text-sm w-fit relative group"
            >
              <input
                onInput={(e) => updatSpellStat("modifier", e.target.value)}
                value={spellStats.modifier ? spellStats.modifier : 0}
                type="text"
                className="bg-transparent border-b border-white w-8 text-center"
              />
              <SVG />
              MODIFIER
            </label>
            <label
              htmlFor=""
              className="flex flex-col items-center text-sm w-fit whitespace-nowrap relative group"
            >
              <input
                onInput={(e) => updatSpellStat("spellAttack", e.target.value)}
                value={spellStats.spellAttack ? spellStats.spellAttack : 0}
                type="text"
                className="bg-transparent border-b border-white w-8 text-center"
              />
              <SVG />
              SPELL ATTACK
            </label>
            <label
              htmlFor=""
              className="flex flex-col items-center text-sm w-fit relative group"
            >
              <input
                onInput={(e) => updatSpellStat("saveDC", e.target.value)}
                type="text"
                className="bg-transparent border-b border-white w-8 text-center"
                value={spellStats.saveDC ? spellStats.saveDC : 0}
              />
              <SVG />
              SAVE DC
            </label>
            <button
              onClick={() => {
                setPopup(!popup);
              }}
              className=""
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
      <div className="w-full text-white overflow-y-auto">
        {menuBtn === 0 && <Actions popup={popup} setPopup={setPopup} />}
        {menuBtn === 1 && <Spells popup={popup} setPopup={setPopup} />}
        {menuBtn === 2 && <Extras />}
        {menuBtn === 3 && <Descriptions />}
        {menuBtn === 4 && <FeatureAndTraits />}
      </div>
    </section>
  );
}

export default SpellsMenu;
