import { useEffect, useState } from "react";
import DeathSaves from "./DeathSaves"
import SVG from "../SVG";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { updateCharacterDB } from "@/app/modules/apiCalls";

function HitPoints({ character, updateCharacter }) {
  const [hitPoints, setHitPoints] = useState(
    character?.hitPoints ?? {
      current: 1,
      max: 0,
      temp: 0,
      fails: [false, false, false],
      saves: [false, false, false],
    }
  );
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (character) {
      setHitPoints(
        character?.hitPoints ?? {
          current: 1,
          max: 0,
          temp: 0,
          fails: [false, false, false],
          saves: [false, false, false],
        }
      );
    }
  }, [character]);

  function AdditionandSubtraction(key) {
    let newState = { ...hitPoints };

    if (key === "plus") {
      newState.current = parseInt(newState.current) + parseInt(counter);
    } else if (key === "minus") {
      newState.current = parseInt(newState.current) - parseInt(counter);
      if (newState.current < 0) {
        newState.current = 0;
      }
    }
    console.log(newState.current);
    updateHitPoints("current", newState.current);
  }

  function updateHitPoints(key, value) {
    let newState = { ...hitPoints };

    newState[key] = value;

    setHitPoints(newState);
    character.hitPoints = newState;

    let update = {
      _id: character._id,
      update: {
        hitPoints: newState,
        updated_by: epochToUtcDateTime(),
      },
    };
    // update context i.e local
    updateCharacter(character);
    // update database
    updateCharacterDB(update);
  }

  return (
    <section className="card w-80 border-neongreen border-2 h-32 flex flex-col gap-2 justify-center text-white">
      <h3 className="h3-title col-start-1 col-span-2 text-center">
        {hitPoints.current !== 0 ? "Hit Points" : "Death Saves"}
      </h3>

      {hitPoints.current !== 0 ? (
        <div className="flex gap-2 justify-between items-center">
          <div
            className={`flex flex-col gap-1 justify-items-center items-center h-full w-fit`}
          >
            <button
              onClick={() => AdditionandSubtraction("plus")}
              data-btn="plus"
              className="bg-neongreen text-black w-full h-5 rounded flex justify-center items-center"
            >
              +
            </button>
            <input
              className="bg-transparent border-b border-white w-14 text-center"
              type="number"
              name=""
              id="AdditionSubtraction"
              onInput={(e) => setCounter(e.target.value)}
              value={counter}
              placeholder="0"
            />
            <button
              onClick={() => AdditionandSubtraction("minus")}
              data-btn="minus"
              className={`bg-neonred text-black flex w-full h-5 rounded justify-center items-center`}
            >
              -
            </button>
          </div>

          <div className="flex gap-2 justify-between w-full h-full">
            <label
              htmlFor=""
              className="flex flex-col items-center relative group"
            >
              <span className="font-almendra text-base uppercase">Current</span>
              <input
                className="basic-input"
                type="text"
                name=""
                onInput={(e) => updateHitPoints("current", e.target.value)}
                value={hitPoints.current === 0 ? "" : hitPoints.current}
                id=""
                placeholder="0"
              />
              <SVG />
            </label>
            <label
              htmlFor=""
              className="flex flex-col items-center relative group"
            >
              <span className="font-almendra text-base uppercase">Max</span>
              <input
                className="basic-input"
                type="text"
                name=""
                onInput={(e) => updateHitPoints("max", e.target.value)}
                value={hitPoints.max === 0 ? "" : hitPoints.max}
                id=""
                placeholder="0"
              />
              <SVG />
            </label>
            <label
              htmlFor=""
              className="flex flex-col items-center relative group"
            >
              <span className="font-almendra text-base uppercase">TEMP</span>
              <input
                className="basic-input"
                type="text"
                name=""
                onInput={(e) => updateHitPoints("temp", e.target.value)}
                value={hitPoints.temp === 0 ? "" : hitPoints.temp}
                id=""
                placeholder="0"
              />
              <SVG />
            </label>
          </div>
        </div>
      ) : (
        <DeathSaves
          setCounter={setCounter}
          counter={counter}
          setHitPoints={setHitPoints}
          hitPoints={hitPoints}
          AdditionandSubtraction={AdditionandSubtraction}
          character={character}
          updateCharacter={updateCharacter}
        />
      )}
    </section>
  );
}

export default HitPoints