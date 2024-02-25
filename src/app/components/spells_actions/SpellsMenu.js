import { useContext, useEffect, useState } from "react";
import Spells from "./spells/Spells";
import Actions from "./actions/Actions";
import Extras from "./extras/Extras";
import Descriptions from "./descriptions/Descriptions";
import FeatureAndTraits from "./featureAndTraits/FeatureAndTraits";
import CharacterContext from "@/app/context/CharacterContext";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { updateCharacterDB } from "@/app/modules/apiCalls";
import StatsBar from "./spells/dc_modifier_attack/StatsBar";

function SpellsMenu() {
  const [menuBtn, setMenuBtn] = useState(0);
  const [popup, setPopup] = useState(false);
  const { character, updateCharacter } = useContext(CharacterContext);
  const [spellStats, setSpellStats] = useState(
    character?.spellStats ?? { modifier: 0, spellAttack: 0, saveDC: 0 }
  );
  const selBtn = "border-neonpurple-500 border rounded";
  const menuOptions = [
    "ACTIONS",
    "SPELLS",
    "EXTRA",
    "DESCRIPTIONS",
    "FEATURES & TRAITS",
  ];

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
          {menuOptions.map((option, i) => (
            <li key={i*3}>
              <button
                onClick={() => setMenuBtn(i)}
                className={`px-2 py-1 ${
                  menuBtn === i ? selBtn : "border-transparent"
                } border `}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
        {menuBtn === 1 && (
          <StatsBar
            updatSpellStat={updatSpellStat}
            spellStats={spellStats}
            setPopup={setPopup}
            popup={popup}
          />
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
