import React, { useEffect, useState } from "react";
import SVG from "../ui_components/SVG";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { updateCharacterDB } from "@/app/modules/apiCalls";

function ProficiencyAndLanguages({ character, updateCharacter }) {
  const [proNLang, setProNLang] = useState(
    character?.ProficiencyAndLanguages ?? {
      armor: "",
      weapons: "",
      tools: "",
      languages: "",
    }
  );

  useEffect(() => {
    if (character) {
      setProNLang(
        character.ProficiencyAndLanguages ?? {
          armor: "",
          weapons: "",
          tools: "",
          languages: "",
        }
      );
    }
  }, [character]);

  function updateProficiencyLanguages(key, value) {
    let newState = { ...proNLang };
    newState[key] = value;
    setProNLang(newState);
    character.ProficiencyAndLanguages = newState;
    let update = {
      _id: character._id,
      update: {
        ProficiencyAndLanguages: newState,
        updated_by: epochToUtcDateTime(),
      },
    };
    // update context i.e local
    updateCharacter(character);
    // update database
    updateCharacterDB(update);
  }

  return (
    <section className="h-full w-full card grid gap-2">
      <label
        className="grid border-b border-white relative group  text-white"
        htmlFor=""
      >
        <span className="uppercase font-almendra text-base text-gray-200">
          ARMOR
        </span>
        <textarea
          rows="1"
          className="bg-transparent text-white text-sm"
          type="text"
          onInput={(e) => updateProficiencyLanguages("armor", e.target.value)}
          value={proNLang.armor === 0 ? "" : proNLang.armor}
        />
        <SVG />
      </label>
      <label
        className="grid border-b border-white relative group text-white"
        htmlFor=""
      >
        <span className="uppercase font-almendra text-base text-gray-200">
          WEAPONS
        </span>
        <textarea
          rows="1"
          className="bg-transparent text-white text-sm"
          type="text"
          onInput={(e) => updateProficiencyLanguages("weapons", e.target.value)}
          value={proNLang.weapons === 0 ? "" : proNLang.weapons}
        />
        <SVG />
      </label>
      <label
        className="grid border-b border-white relative group text-white"
        htmlFor=""
      >
        <span className="uppercase font-almendra text-base text-gray-200">
          TOOLS
        </span>
        <textarea
          rows="1"
          className="bg-transparent text-white text-sm"
          type="text"
          onInput={(e) => updateProficiencyLanguages("tools", e.target.value)}
          value={proNLang.tools === 0 ? "" : proNLang.tools}
        />
        <SVG />
      </label>
      <label
        className="grid border-b border-white relative group text-white"
        htmlFor=""
      >
        <span className="uppercase font-almendra text-base text-gray-200">
          LANGUAGES
        </span>
        <textarea
          rows="1"
          className="bg-transparent text-white text-sm"
          type="text"
          onInput={(e) =>
            updateProficiencyLanguages("languages", e.target.value)
          }
          value={proNLang.languages === 0 ? "" : proNLang.languages}
        />
        <SVG />
      </label>
      <h4 className="h4-title text-center">Proficiency & Languages</h4>
    </section>
  );
}

export default ProficiencyAndLanguages;
