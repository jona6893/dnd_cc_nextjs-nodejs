import { saveCharacterData } from "@/app/modules/ElectronSaves";
import { useEffect, useState } from "react";
import SVG from "../SVG";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { updateCharacterDB } from "@/app/modules/apiCalls";


function Skills({ character, updateCharacter }) {
  const defaultSkills = [
    { skill: "Acrobatics (DEX)", value: 0, checked: false },
    { skill: "Animal Handling (STR)", value: 0, checked: false },
    { skill: "Arcana (INT)", value: 0, checked: false },
    { skill: "Athletics (STR)", value: 0, checked: false },
    { skill: "Deception (CHA)", value: 0, checked: false },
    { skill: "History (INT)", value: 0, checked: false },
    { skill: "Insight (WIS)", value: 0, checked: false },
    { skill: "Intimidation (CHA)", value: 0, checked: false },
    { skill: "Investigation (INT)", value: 0, checked: false },
    { skill: "Medicine (WIS)", value: 0, checked: false },
    { skill: "Nature (INT)", value: 0, checked: false },
    { skill: "Perception (WIS)", value: 0, checked: false },
    { skill: "Performance (CHA)", value: 0, checked: false },
    { skill: "Persuasion (CHA)", value: 0, checked: false },
    { skill: "Religion (INT)", value: 0, checked: false },
    { skill: "Sleight of Hand (DEX)", value: 0, checked: false },
    { skill: "Stealth (DEX)", value: 0, checked: false },
    { skill: "Survival(Wis)", value: 0, checked: false },
  ];
  const [skills, setSkills] = useState(character?.skills || defaultSkills);
  useEffect(() => {
    setSkills(character?.skills ?? defaultSkills);
    //console.log(character.savingThrow)
  }, [character]);

  // checkmark toggle
  function handleSkillClick(index) {
    setSkills((prevSkills) => {
      // Creating a new array with all previous items
      const newSkills = [...prevSkills];

      // Toggling the 'checked' property of the clicked skill
      newSkills[index] = {
        ...newSkills[index],
        checked: !newSkills[index].checked,
      };

      return newSkills;
    });
  }

  function updatSkills(index, value) {
    setSkills((prevSkills) => {
      const newSkills = [...prevSkills];

      newSkills[index] = {
        ...newSkills[index],
        value: value,
      };
      return newSkills;
    });
  }

  //Save character updates
  useEffect(() => {
    if (!character?.skills && character._id) {
      //console.log(character)
      character.skills = defaultSkills;
      return;
    } else {
      if (character._id) {
        character.skills = skills;
        //console.log(character)
        let update = {
          _id: character._id,
          update: {
            skills: skills,
            updated_by: epochToUtcDateTime(),
          },
        };
        // update context i.e local
        updateCharacter(character);
        // update database
        updateCharacterDB(update);
        //saveCharacterData(character, character.id);
      }
    }
  }, [skills]);

  return (
    <section className="card border-neonpurple-500 p-4 rounded-md border w-fit min-w-[16rem] flex flex-col gap-2">
      {skills.map((skill, index) => {
        return (
          <div key={skill.skill} className="text-white">
            <label
              htmlFor=""
              className="flex gap-2 items-center group relative"
            >
              <div
                onClick={() => handleSkillClick(index)}
                className={`${
                  skill.checked === true
                    ? "bg-neonpurple-500"
                    : "bg-transparent"
                } w-5 h-5 cursor-pointer rounded-full border-neonpurple-500 border`}
              ></div>
              <input
                onInput={(e) => updatSkills(index, e.target.value)}
                className="basic-inputt w-8 bg-transparent text-center border-b border-white text-base uppercase"
                type="text"
                name=""
                placeholder="0"
                value={skill.value === 0 ? "" : skill.value}
                id=""
              />
              <span className="h4-title">{skill.skill}</span>
              <SVG />
            </label>
          </div>
        );
      })}
    </section>
  );
}

export default Skills