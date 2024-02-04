import React, { useState } from "react";
import Popup from "../modals/Popup";

function Extras() {
const [classSel, setClassSel] = useState("")
const [modal, setModal] = useState(false)

  const dndClasses = [
    {
      class: "Sorcerer",
      system: "Sorcery Points",
      description:
        "Flexible spellcasting through the use of Sorcery Points. Can convert spell slots and enhance spells.",
    },
    {
      class: "Cleric",
      system: "Channel Divinity",
      description:
        "Divine connection allows the use of Channel Divinity for various effects, such as Turn Undead or Divine Smite.",
    },
    {
      class: "Paladin",
      system: "Channel Divinity",
      description:
        "Divine connection allows the use of Channel Divinity for various effects, such as Sacred Weapon or Divine Smite.",
    },
    {
      class: "Monk",
      system: "Ki Points",
      description:
        "Utilizes Ki Points to fuel special abilities like Flurry of Blows, Patient Defense, and Step of the Wind.",
    },
    {
      class: "Warlock",
      system: "Pact Magic",
      description:
        "Unique spellcasting system with Pact Magic. Regains all expended spell slots after a short rest.",
    },
    {
      class: "Fighter",
      system: "Action Surge, Second Wind",
      description:
        "Action Surge allows an additional action. Second Wind regains hit points after a short rest.",
    },
    {
      class: "Wizard",
      system: "Arcane Recovery",
      description:
        "Recovers expended spell slots during a short rest, enhancing spellcasting sustainability.",
    },
    {
      class: "Bard",
      system: "Bardic Inspiration",
      description:
        "Grants Bardic Inspiration, allowing the addition of an inspiration die to ability checks, attack rolls, or saving throws.",
    },
    {
      class: "Druid",
      system: "Wild Shape",
      description:
        "Uses Wild Shape to transform into animals. The number of uses and available forms depend on level and subclass features.",
    },
    {
      class: "Rogue",
      system: "Cunning Action",
      description:
        "Cunning Action allows a bonus action to Dash, Disengage, or Hide during the turn, enhancing mobility and tactical options.",
    },
    {
      class: "Barbarian",
      system: "Rage",
      description:
        "Enters a state of Rage, gaining advantages on strength-based checks and saving throws, dealing extra melee damage, and gaining damage resistance.",
    },
  ];

  return (
    <section className="h-fit grid gap-2 pt-2">
      <div className="flex gap-4">
        <select
          className="text-black"
          onChange={(e) => setClassSel(e.target.value)}
        >
          <option>Class</option>
          {dndClasses.map((dnd, index) => (
            <option key={index} value={dnd.system}>
              {dnd.class}
            </option>
          ))}
        </select>
        <input type="text" value={classSel} placeholder="Select a class" className="bg-transparent" />
        <input type="text" className="cs-input w-16 text-base" placeholder="Amount" />
        <button
          onClick={() => {
            setModal(!modal);
          }}
          className="ml-auto"
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
      {modal && (
        <Popup state={modal} setState={setModal}>
          <button
            className="absolute top-4 right-6 text-white"
            onClick={() => {
              setModal(!modal);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <div className="grid grid-cols-2">
            <h2 className="col-span-2 h2-title">{classSel}</h2>
            <div className="grid gap-2 [&>*]:p-1">
              <input type="text" className="border border-white" placeholder="Name" />
              <input type="text" className="border border-white" placeholder="Description" />
              <input type="text" className="border border-white" placeholder="Action" />
              <input type="text" className="border border-white" placeholder="Distance" />
              <button className="bg-neongreen px-2 rounded">ADD</button>
            </div>
          </div>
        </Popup>
      )}
    </section>
  );
}

export default Extras;
