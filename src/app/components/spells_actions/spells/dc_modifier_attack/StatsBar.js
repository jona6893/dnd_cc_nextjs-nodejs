import SVG from "@/app/components/ui_components/SVG";
import React from "react";

function StatsBar({ updatSpellStat, spellStats, setPopup, popup }) {
  return (
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
        <span className="text-gray-300">MODIFIER</span>
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
        <span className="text-gray-300">SPELL ATTACK</span>
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
        <span className="text-gray-300">SAVE DC</span>
      </label>
      <button
        className="bg-[#3f3f46] w-8 h-8 rounded-lg"
        onClick={() => {
          setPopup(!popup);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white m-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
          />
        </svg>
      </button>
    </div>
  );
}

export default StatsBar;
