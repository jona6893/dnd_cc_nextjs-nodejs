import { updateCharacterDB } from "@/app/modules/apiCalls";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { nanoid } from "nanoid";
import { useState } from "react";

function KnownSpells({
  spells,
  setPreviewSpell,
  setSpells,
  character,
  updateCharacter,
}) {
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

  console.log(spells);

  function moveBetweenPreparedAndKnown(spellToMove, spellLevel) {
    let newState = [...spells];

    // Check if the spell is in known
    let isSpellInKnown = newState[0]?.known?.some(
      (spell) => spell.name === spellToMove.name
    );

    // Move spell from known to prepared
    if (isSpellInKnown) {
      // Remove spell from known
      newState[0].known = newState[0].known.filter(
        (spell) => spell.name !== spellToMove.name
      );

      // Add spell to prepared
      if (!newState[1]) newState[1] = { prepared: [] };
      let preparedGroup = newState[1].prepared.find(
        (group) => group.spellLevel === spellLevel
      );
      if (!preparedGroup) {
        preparedGroup = { spellLevel, spellSlots: [], spells: [] };
        newState[1].prepared.push(preparedGroup);
      }
      preparedGroup.spells.push(spellToMove);
    }
    // Move spell from prepared to known
    else {
      // Remove spell from prepared
      newState[1].prepared.forEach((group) => {
        group.spells = group.spells.filter(
          (spell) => spell.name !== spellToMove.name
        );
      });

      // Add spell to known
      newState[0].known.push(spellToMove);
    }
    //console.log(newState)
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

  function removeSpell(spellToRemove) {
    let newState = [...spells];

    // Check if the spell is in known
    let isSpellInKnown = newState[0]?.known?.some(
      (spell) => spell.name === spellToRemove.name
    );

    // Move spell from known to prepared
    if (isSpellInKnown) {
      // Remove spell from known
      newState[0].known = newState[0].known.filter(
        (spell) => spell.name !== spellToRemove.name
      );
    }
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
    <div className="flex flex-wrap gap-2 mt-2">
      {spells[0].known?.map((spell) => {
        const bgColorClass = `${getDamageTypeColor(spell)}`;

        return (
          <div
            key={nanoid()}
            className={`group cursor-pointer ${"border-" + bgColorClass} ${
              "bg-" + bgColorClass + "/10"
            } border rounded-lg w-fit p-1 flex gap-2 items-center relative`}
          >
            <p
              className="h4-title font-semibold"
              onClick={() => {
                setPreviewSpell(spell);
              }}
            >
              {spell.name}
            </p>
            <select
              className=" bg-neongreen text-black w-8 h-6 rounded group-hover:block"
              defaultValue={"+"}
              onChange={(e) =>
                moveBetweenPreparedAndKnown(spell, e.target.value)
              }
            >
              <option value="+" disabled hidden>
                +
              </option>
              <option value="0">Cantrips</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            <button
              onClick={() => removeSpell(spell)}
              className=" bg-neonred text-black w-6 h-6 rounded group-hover:block"
            >
              -
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default KnownSpells;
