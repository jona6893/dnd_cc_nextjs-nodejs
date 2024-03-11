import { updateCharacterDB } from "@/app/modules/apiCalls";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { Select, SelectItem, Input, Textarea } from "@nextui-org/react";
import { nanoid } from "nanoid";
import { useState } from "react";

function FormSpell({
  formSpell,
  setFormSpell,
  spells,
  setSpells,
  character,
  updateCharacter,
}) {
  const [formFields, setformFields] = useState({});
  const [selector, setSelector] = useState("");
  const fields = [
    "Name",
    "Range",
    "Casting time",
    "Duration",
    "At Higher level",
    "Level",
  ];

  function handleSubmit(event) {
    event.preventDefault();
    const name = formFields["Name"];
    const range = formFields["Range"];
    const level = formFields["Level"];
    const casting_time = formFields["Casting time"];
    const duration = formFields["Duration"];
    const higher_level = formFields["At Higher level"];
    const description = formFields["Description"];
    let concentration;
    if (selector === "true") {
      concentration = true;
    } else {
      concentration = false;
    }
    const newSpell = {
      name,
      range,
      level: parseInt(level),
      casting_time,
      duration,
      higher_level: [higher_level],
      desc: [description],
      concentration,
    };
    let newState = [...spells];
    let isSpellInKnown = newState[0]?.known?.some(
      (spell) => spell.name === newSpell.name
    );
    if (isSpellInKnown) {
      return;
    }
    let newspells = [...newState[0]?.known, newSpell];
    newState[0].known = newspells;
    setSpells(newspells);
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

  function updateFormField(event, field) {
    let newState = { ...formFields };
    newState[field] = event;
    setformFields(newState);
    console.log(formFields);
    console.log(selector);
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        className="flex font-almendra font-semibold justify-between gap-2 border-neonpurple-500 border-b-2 py-1 "
        onClick={() => setFormSpell(!formSpell)}
      >
        Add Custom Spell
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${
            formSpell ? "rotate-0" : "rotate-90"
          } duration-300 `}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {formSpell && (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-2 mt-2 whitespace-nowrap"
        >
          {fields.map((field, i) => {
            return (
              <div key={i}>
                {field === "Name" && (
                  <Input
                    key={nanoid}
                    type="text"
                    isRequired
                    label={field}
                    onValueChange={(e) => updateFormField(e, field)}
                  />
                )}
                {field === "Level" && (
                  <Input
                    key={nanoid}
                    type="text"
                    isRequired
                    label={field}
                    onValueChange={(e) => updateFormField(e, field)}
                  />
                )}
                {field !== "Name" && field !== "Level" && (
                  <Input
                    type="text"
                    label={field}
                    onValueChange={(e) => updateFormField(e, field)}
                  />
                )}
              </div>
            );
          })}
          <Select
            isRequired
            label="Concentration"
            className="max-w-xs"
            /* selectedKeys={[selector]} */
            onChange={(e) => setSelector(e.target.value)}
          >
            <SelectItem key={"true"} value={"true"}>
              True
            </SelectItem>
            <SelectItem key={"false"} value={"false"}>
              False
            </SelectItem>
          </Select>
          <div className="grid gap-2 col-span-2">
            <Textarea
              label="Description"
              placeholder="Enter your description"
              className="col-span-2"
              fullWidth
              onValueChange={(e) => updateFormField(e, "Description")}
            />
            <button
              type="submit"
              className="col-span-2 bg-neonpurple-400 hover:bg-neonpurple-500 px-6 py-3 rounded-xl"
            >
              Add Spell
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default FormSpell;
