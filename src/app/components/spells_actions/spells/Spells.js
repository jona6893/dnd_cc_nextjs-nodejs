import React, { useContext, useEffect, useState } from "react";
import Popup from "../../modals/Popup";
import ManageSpells from "./ManageSpells";
import CharacterContext from "@/app/context/CharacterContext";
import {compareBySpelllevel} from "@/app/modules/ElectronSaves";
import { nanoid } from "nanoid";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { updateCharacterDB } from "@/app/modules/apiCalls";

function Spells({ popup, setPopup }) {
  const { character, updateCharacter } = useContext(CharacterContext);
  const [spells, setSpells] = useState(
    character?.spells ?? [{ known: [] }, { prepared: [] }]
  );
  useEffect(() => {
    setSpells(character?.spells ?? [{ known: [] }, { prepared: [] }]);
    //console.log(character.savingThrow)
  }, [character]);

  function updateSpells(newSpell) {
    //console.log("updateSpells called with", newSpell);
    setSpells((prev) => {
      let newState = [...prev];

      if (newState[0] && newState[0].known) {
        // Check for duplicate spell
        const isDuplicate = newState[0].known.some(
          (spell) => spell.name === newSpell.name
        );
        if (!isDuplicate) {
          newState[0].known = [...newState[0].known, newSpell];
        }
      } else {
        newState[0] = { known: [newSpell] };
      }

      //console.log("New state:", newState); // Logging the new state
      return newState;
    });
    character.spells = spells;

    let update = {
      _id: character._id,
      update: {
        spells: spells,
        updated_by: epochToUtcDateTime(),
      },
    };
    // update context i.e local
    updateCharacter(character);
    // update database
    updateCharacterDB(update);
  }

  /* Spell background colors */
  const damageColors = {
    Slashing: "brute",
    Piercing: "brute",
    Bludgeoning: "brute",
    Poison: "poison",
    Acid: "acid",
    Fire: "fire",
    Cold: "cold",
    Radiant: "radient",
    Necrotic: "necrotic",
    Lightning: "lightning",
    Thunder: "thunder",
    Force: "force",
    Psychic: "psychic",
    other: "brute",
  };
  //const [selectedSpellLevel, setSelectedSpellLevel] = useState("");

  function getDamageTypeColor(spell) {
    // Assuming spell.damage and spell.damage.damageType are defined
    // and spell.damage.damageType.name holds the type of damage
    const damageType = spell.damage?.damage_type?.name;
    //console.log(damageColors[damageType]);
    return damageColors[damageType] || "brute"; // Default to "brute" if not found
  }

  // checkmark toggle
  function handleSlotClick(index, slotindex) {
    let newState = [...spells];
    // Toggling the 'checked' property of the clicked skill
    newState[1].prepared[index].spellSlots[slotindex] =
      !newState[1].prepared[index].spellSlots[slotindex];

    setSpells(newState);
    character.spells = spells;

    let update = {
      _id: character._id,
      update: {
        spells: newState,
        updated_by: epochToUtcDateTime(),
      },
    };
    // update context i.e local
    updateCharacter(character);
    // update database
    updateCharacterDB(update);
  }

  return (
    <div className="w-full grid gap-2 mt-2">
      {spells[1]?.prepared?.sort(compareBySpelllevel).map((pre, index) => {
        return (
          <div key={nanoid()} className="flex flex-col gap-2">
            <div className="w-full border-b border-white flex gap-2 pb-1">
              {pre.spells.length >= 1 && (
                <h5 className="text-sm">
                  {pre.spellLevel === "0"
                    ? "Cantrips"
                    : "Level " + pre.spellLevel}
                </h5>
              )}
              {pre.spells.length >= 1 &&
                pre.spellSlots.map((slot, slotindex) => {
                  //console.log(index);
                  return (
                    <div
                      key={nanoid()}
                      onClick={() => handleSlotClick(index, slotindex)}
                      className={`${
                        slot === true ? "bg-neonpurple-500" : "bg-transparent"
                      } w-5 h-5 cursor-pointer rounded-full border-neonpurple-500 border`}
                    ></div>
                  );
                })}
            </div>

            {pre.spells.map((spell) => {
              const bgColorClass = `${getDamageTypeColor(spell)}`;
              return (
                <div
                  key={nanoid()}
                  className={`${"border-" + bgColorClass} ${
                    "bg-" + bgColorClass + "/10"
                  } border w-full rounded grid grid-cols-equipmentRowPopup px-2 py-1 cursor-pointer`}
                >
                  <p className="h4-title font-bold">{spell.name}</p>
                  <span className="text-center">{spell.casting_time}</span>
                  <span className="text-end">{spell.range}</span>
                </div>
              );
            })}
          </div>
        );
      })}
      {popup && (
        <Popup state={popup} setState={setPopup}>
          <ManageSpells
            popup={popup}
            setPopup={setPopup}
            character={character}
            updateCharacter={updateCharacter}
            updateSpells={updateSpells}
            spells={spells}
            setSpells={setSpells}
          />
        </Popup>
      )}
    </div>
  );
}

export default Spells;
