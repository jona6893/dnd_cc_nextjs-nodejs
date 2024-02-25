"use client";
import { useContext, useEffect, useState } from "react";
import CharacterDetails from "./components/Basic Stats/CharacterDetails";
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
import { checkSession } from "./sessionActions/checkSession";
import OnScreenMenu from "./components/Startmenu/OnScreenMenu";
import { NextUIProvider } from "@nextui-org/react";

let ipcRenderer = null;
if (typeof window !== "undefined" && window.require) {
  ipcRenderer = window.require("electron").ipcRenderer;
}

export default function Home() {
  const { character, updateCharacter } = useContext(CharacterContext);
  const [tglMenus, setTglMenus] = useState({
    actionSpells: true,
    equipment: true,
    stats: true,
    skills: true,
  });
  // get the logged in users id and username
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await checkSession();
        //console.log(JSON.parse(result.value));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  let props = {
    character: character,
    updateCharacter: updateCharacter,
  };

  return (
    <NextUIProvider>
      <main className="flex gap-2 min-h-screen items-start ml:justify-center sm:px-4 max-sm:px-2 py-4 pb-24  overflow-auto relative">
        {Object.keys(character).length == 0 && <Startscreen />}
        {tglMenus.skills && (
          <div className="grid gap-2">
            <Skills {...props} />
            <ProficiencyAndLanguages {...props} />
          </div>
        )}
        {tglMenus.stats && (
          <div className=" flex flex-col gap-2 max-sm:p-2">
            <div className="sm:flex gap-2 max-sm:grid">
              <CharacterDetails {...props} />
            </div>
            <div className="sm:flex max-sm:grid max-sm:order-1 gap-2">
              <div className="flex flex-col gap-2 items-center sm:w-fit max-sm:w-full">
                <div className="sm:flex max-sm:grid max-sm:grid-cols-3 gap-2 w-full justify-between max-sm:justify-items-center">
                  <ArmorClass {...props} />
                  <WalkingSpeed {...props} />
                  <Initiative {...props} />
                </div>
                <div className="flex gap-2 justify-between">
                  <Proficiency {...props} />
                  <Inspiration {...props} />
                </div>
                <HitPoints {...props} />
                <Stats {...props} />
                <SavingThrows {...props} />
              </div>
            </div>
          </div>
        )}
        {tglMenus.actionSpells && (
          <div className={`grid gap-4`}>
            <SpellsMenu {...props} />
            <Equipment {...props} />
          </div>
        )}
        <OnScreenMenu setTglMenus={setTglMenus} tglMenus={tglMenus} />
      </main>
    </NextUIProvider>
  );
}
