import { saveCharacterData } from "@/app/modules/ElectronSaves";


function DeathSaves({
  AdditionandSubtraction,
  counter,
  setCounter,
  hitPoints,
  setHitPoints,
  character,
}) {
  function updateFailsAndSaves(key, index) {
    let newState = { ...hitPoints };

    newState[key][index] = !newState[key][index];

    console.log(newState);
    setHitPoints(newState);
    character.hitPoints = newState
    saveCharacterData(character, character.id);
  }

  return (
    <div className="flex gap-4 justify-evenly items-center">
      <div
        className={`flex flex-col-reverse gap-2 justify-items-center items-end h-full w-fit`}
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
      </div>
      <div className="flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          enableBackground="new 0 0 100 100"
          viewBox="0 0 100 125"
          className="w-14 h-14 stroke-white fill-white"
        >
          <path d="M69.4 29.3L64.8 33.9 60.2 29.3 56.2 33.4 60.8 38 56.2 42.6 60.2 46.6 64.8 42 69.4 46.6 73.5 42.6 68.9 38 73.5 33.4z"></path>
          <path d="M38.2 29.3L33.6 33.9 29 29.3 24.9 33.4 29.5 38 24.9 42.6 29 46.6 33.6 42 38.2 46.6 42.3 42.6 37.6 38 42.3 33.4z"></path>
          <path d="M49.8 4.4c-25 0-45.3 16.9-45.3 37.8 0 11 5.7 21.3 15.6 28.5v19.8c0 3 2.5 5.5 5.5 5.5h45.6c3 0 5.5-2.5 5.5-5.5v-18C88.2 65.4 95 54.2 95 42.2 95 21.3 74.7 4.4 49.8 4.4zm22.3 63.7l-1.5.9v20.9h-10V74.4H55v15.5H42.7V74.4h-5.5v15.5h-11V67.4l-1.4-.9c-9-6.1-14.2-14.9-14.2-24.4 0-17.5 17.6-31.7 39.1-31.7 21.6 0 39.1 14.2 39.1 31.7.1 10.4-6.2 20.1-16.7 26z"></path>
          <path d="M51 53.6c-.3-.6-.9-1-1.6-1-.7 0-1.4.3-1.7.9l-5.8 10.1c-.3.5-.3 1.1.1 1.6.3.5.9.8 1.6.8h10.8c.6 0 1.2-.3 1.5-.7.3-.5.4-1 .1-1.6l-5-10.1z"></path>
        </svg>
        <div>
          <div className="flex gap-2 justify-between">
            <h4>FAILURE</h4>
            <div className="flex gap-2">
              <div
                onClick={() => updateFailsAndSaves("fails", 0)}
                className={`${
                  hitPoints.fails[0] === true ? "bg-neonred" : "bg-transparent"
                } w-5 h-5 cursor-pointer rounded-full border-neonred border`}
              ></div>
              <div
                onClick={() => updateFailsAndSaves("fails", 1)}
                className={`${
                  hitPoints.fails[1] === true ? "bg-neonred" : "bg-transparent"
                } w-5 h-5 cursor-pointer rounded-full border-neonred border`}
              ></div>
              <div
                onClick={() => updateFailsAndSaves("fails", 2)}
                className={`${
                  hitPoints.fails[2] === true ? "bg-neonred" : "bg-transparent"
                } w-5 h-5 cursor-pointer rounded-full border-neonred border`}
              ></div>
            </div>
          </div>

          <div className="flex gap-2 justify-between">
            <h4>SUCCESS</h4>
            <div className="flex gap-2">
              <div
                onClick={() => updateFailsAndSaves("saves", 0)}
                className={`${
                  hitPoints.saves[0] === true
                    ? "bg-neongreen"
                    : "bg-transparent"
                } w-5 h-5 cursor-pointer rounded-full border-neongreen border`}
              ></div>
              <div
                onClick={() => updateFailsAndSaves("saves", 1)}
                className={`${
                  hitPoints.saves[1] === true
                    ? "bg-neongreen"
                    : "bg-transparent"
                } w-5 h-5 cursor-pointer rounded-full border-neongreen border`}
              ></div>
              <div
                onClick={() => updateFailsAndSaves("saves", 2)}
                className={`${
                  hitPoints.saves[2] === true
                    ? "bg-neongreen"
                    : "bg-transparent"
                } w-5 h-5 cursor-pointer rounded-full border-neongreen border`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeathSaves