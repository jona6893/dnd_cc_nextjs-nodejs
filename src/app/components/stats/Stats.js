import { useEffect, useState } from "react";
import SVG from "../SVG";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { updateCharacterDB } from "@/app/modules/apiCalls";

function Stats({ character, updateCharacter }) {
  const defaultStats = [
    { name: "strength", value: 0, bonus: 0, bonusOverride: false },
    { name: "dexterity", value: 0, bonus: 0, bonusOverride: false },
    { name: "constitution", value: 0, bonus: 0, bonusOverride: false },
    { name: "intelligence", value: 0, bonus: 0, bonusOverride: false },
    { name: "wisdom", value: 0, bonus: 0, bonusOverride: false },
    { name: "charisma", value: 0, bonus: 0, bonusOverride: false },
  ];
  const [stats, setStats] = useState(character?.stats ?? defaultStats);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setStats(character?.stats ?? defaultStats);
    //console.log(character.savingThrow)
  }, [character]);

  const updateStatValue = (index, newValue, isBonus = false) => {
    setStats((prevStats) =>
      prevStats.map((stat, i) => {
        if (i === index) {
          if (isBonus) {
            return { ...stat, bonus: newValue, bonusOverride: true };
          } else {
            return {
              ...stat,
              value: newValue,
              bonusOverride: false,
              bonus: stat.bonusOverride
                ? stat.bonus
                : Math.floor((newValue - 10) / 2),
            };
          }
        }
        return stat;
      })
    );
  };

  useEffect(() => {
    console.log("jhboubo");
    if (!character._id) {
      return;
    }
    character.stats = stats;

    let update = {
      _id: character._id,
      update: {
        stats: stats,
        updated_by: epochToUtcDateTime(),
      },
    };
    // update context i.e local
    updateCharacter(character);
    // update database
    updateCharacterDB(update);
  }, [stats]);

  return (
    <section className="grid sm:grid-cols-3 max-sm:grid-cols-3 justify-items-center gap-2 text-white w-full">
      {defaultStats.map((stat, i) => {
        return (
          <div key={stat.name} className="card text-white w-24">
            <div className="grid gap-2 justify-items-center">
              <h4 className="h4-titles font-almendra uppercase text-sm">
                {stat.name}
              </h4>
              <label className="relative group">
                <input
                  onInput={(e) => updateStatValue(i, e.target.value)}
                  type="text"
                  className="basic-input"
                  value={stats[i].value}
                  placeholder="0"
                />
                <SVG />
              </label>
              <label className="relative group">
                <input
                  onInput={(e) => updateStatValue(i, e.target.value, true)}
                  type="text"
                  className="bg-transparent border-2 border-neonpurple-500 w-8 text-center rounded text-md"
                  placeholder="0"
                  value={
                    stats[i].bonusOverride
                      ? stats[i].bonus
                      : Math.floor((stats[i].value - 10) / 2)
                  }
                />
                <SVG />
              </label>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default Stats;
