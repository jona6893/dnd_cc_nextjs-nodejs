"use client";
import { useContext, useEffect, useState } from "react";
import CharacterDetails from "./components/CharacterDetails";
import Stats from "./components/stats/Stats";
import ArmorClass from "./components/Basic Stats/ArmorClass";
import WalkingSpeed from "./components/Basic Stats/WalkingSpeed";
import Initiative from "./components/Basic Stats/Initiative";
import Proficiency from "./components/Basic Stats/Proficiency";
import Inspiration from "./components/Basic Stats/Inspiration";
import SavingThrows from "./components/Basic Stats/SavingThrows";
import Equipment from "./components/Equipment/Equipment";
import Startscreen from "./components/Startmenu/Startscreen";
import CharacterContext from "./context/CharacterContext";
import Skills from "./components/skills/Skills";
import SpellsMenu from "./components/spells_actions/SpellsMenu";
import HitPoints from "./components/hit_points/HitPoints";
import ProficiencyAndLanguages from "./components/Basic Stats/ProficiencyAndLanguages";

let ipcRenderer = null;
if (typeof window !== "undefined" && window.require) {
  ipcRenderer = window.require("electron").ipcRenderer;
}

export default function Home() {
  const { character } = useContext(CharacterContext);
  const [tglMenus, setTglMenus] = useState({
    actionSpells: true,
    equipment: true,
    stats: true,
    skills: true,
  });

 

  function OnScreenMenu() {
    function tgl(item) {
      let newState = { ...tglMenus };
      newState[item] = !newState[item];
      setTglMenus(newState);
    }

    return (
      <div className="fixed bottom-0 left-0 right-0 mx-auto px-2 h-[50px] w-fit bg-black/25 sm:flex max-sm:grid max-sm:grid-cols-2 gap-4 justify-center items-center justify-items-center">
        <button
          onClick={() => tgl("skills")}
          className=" flex justify-center items-center bg-purple-500 rounded w-fit h-6 px-2"
        >
          Skills
        </button>

        <button
          onClick={() => tgl("stats")}
          className=" flex justify-center items-center bg-purple-500 rounded w-fit h-6 px-2"
        >
          Stats
        </button>
        <button
          onClick={() => tgl("actionSpells")}
          className=" flex justify-center items-center bg-purple-500 rounded w-fit h-6 px-2"
        >
          Actions/Equipment
        </button>
      </div>
    );
  }

  return (
    <main className="flex gap-2 min-h-screen items-start lg:justify-center sm:px-4 max-sm:px-2 py-4 bg-background overflow-auto relative">
      {Object.keys(character).length == 0 && <Startscreen />}
      {tglMenus.skills && (
        <div className="grid gap-2">
          <Skills character={character} />
          <ProficiencyAndLanguages character={character} />
        </div>
      )}
      {tglMenus.stats && (
        <div className=" flex flex-col gap-2 max-sm:p-2">
          <div className="sm:flex gap-2 max-sm:grid">
            {/* <div className="sm:w-44 bg-neonpurple-300 h-48 rounded-md max-sm:order-1">
              IMAGE
            </div> */}
            <CharacterDetails character={character} />
          </div>
          <div className="sm:flex max-sm:grid max-sm:order-1 gap-2">
            {/* <Stats character={character} /> */}

            <div className="flex flex-col gap-2 items-center sm:w-fit max-sm:w-full">
              <div className="sm:flex max-sm:grid max-sm:grid-cols-3 gap-2 w-full justify-between max-sm:justify-items-center">
                <ArmorClass character={character} />
                <WalkingSpeed character={character} />
                <Initiative character={character} />
              </div>
              <div className="flex gap-2 justify-between">
                <Proficiency character={character} />
                <Inspiration character={character} />
              </div>
              <HitPoints character={character} />
              <Stats character={character} />
              <SavingThrows character={character} />
            </div>
          </div>
        </div>
      )}
      {tglMenus.actionSpells && (
        <div className={`grid gap-4`}>
          <SpellsMenu character={character} />
          <Equipment character={character} />
        </div>
      )}
      <OnScreenMenu />
    </main>
  );
}
