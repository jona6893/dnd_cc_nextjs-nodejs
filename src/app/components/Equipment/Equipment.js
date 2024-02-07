import { useContext, useEffect, useState } from "react";
import Popup from "../modals/Popup";
import { nanoid } from "nanoid";
import PopupContent from "./PopupContent";
import CharacterContext from "@/app/context/CharacterContext";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { updateCharacterDB } from "@/app/modules/apiCalls";

function Equipment({ character }) {
  const [popup, setPopup] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [equipment, setEquipment] = useState(character?.equipment ?? []);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const { updateCharacter } = useContext(CharacterContext);



  function tglReadMore(index) {
    if (readMore === index) {
      setReadMore(false);
    } else {
      setReadMore(index);
    }
  }

 useEffect(() => {
   setEquipment(character?.equipment ?? []);
   //console.log(character.savingThrow)
 }, [character]);

function updateEquipment(name, description,url) {
       setEquipment((prev) => [
         ...prev,
         { id: nanoid(), name, description, amount: 1,url, equipped:false},
       ]);
  }

function countItemAmount(item){
  const type = event.target.dataset.btn;

  // Create a copy of the current equipment array
  let newEquipment = [...equipment];
  // find the item index
  let itemToCount = newEquipment.findIndex((i) => item.id === i.id);
  // Update the amount for the item at the specified index
  if (type === "plus") {
    newEquipment[itemToCount] = {
      ...newEquipment[itemToCount],
      amount: newEquipment[itemToCount].amount + 1,
    };
  } else if (type === "minus") {
    // Ensure amount does not go below 0
    if (newEquipment[itemToCount].amount > 0) {
      newEquipment[itemToCount] = {
        ...newEquipment[itemToCount],
        amount: newEquipment[itemToCount].amount - 1,
      };
    } else {
      // Filter out the item if the amount reaches 0
      newEquipment = newEquipment.filter((_, i) => i !== itemToCount);
      //console.log("delete equipment");
    }
  }

  // Return the new array
  setEquipment(newEquipment);
  //filterSearch(document.querySelector("#localEquipmentSearch").value);
   

}

function filterSearch(value) {
  const filtered = equipment?.filter((item) =>
    item.name.toLowerCase().includes(value.toLowerCase())
  );
  setFilteredEquipment(filtered)
  // TODO Set filtered result to new state and show results in equiptment overview.
}

function checkEquipped(item){
  let newState= [...equipment]
  let itemToEquip = newState.findIndex((i) => item.id === i.id);

  newState[itemToEquip].equipped = !newState[itemToEquip].equipped;
  setEquipment(newState);
 
}

  // save updated equipment
  useEffect(() =>{
    if (!character._id) {
      return;
    }
    character.equipment = equipment

    let update = {
      _id: character._id,
      update: {
        equipment: equipment,
        updated_by: epochToUtcDateTime(),
      },
    };
    // update context i.e local
    updateCharacter(character);
    // update database
    updateCharacterDB(update);
  },[equipment])


  useEffect(()=>{
    filterSearch(document.querySelector("#localEquipmentSearch").value);
  },[equipment])

  return (
    <div className="w-auto sm:max-w-[600px] h-96 card flex flex-col gap-2 border-neonorange border">
      {popup && (
        <Popup state={popup} setState={setPopup}>
          <PopupContent
            popup={popup}
            setPopup={setPopup}
            updateEquipment={updateEquipment}
            equipment={equipment}
            setEquipment={setEquipment}
            readMore={readMore}
            tglReadMore={tglReadMore}
            countItemAmount={countItemAmount}
          />
        </Popup>
      )}
      <div className="flex justify-between border-b border-white p-2">
        <h3 className="h3-title">Equipment</h3>
        <label className="flex">
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input
            id="localEquipmentSearch"
            type="text"
            className="bg-transparent text-white px-2 w-full"
            placeholder="Search"
            onInput={(e) => filterSearch(e.target.value)}
          />
        </label>
        <button onClick={() => setPopup(!popup)}>
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
      <div className="flex flex-col gap-2 overflow-auto">
        {filteredEquipment.length > 0
          ? filteredEquipment.map((item, index) => (
              <div
                key={item.id}
                className="grid text-base grid-cols-equipmentRow items-center  justify-between cursor-pointer bg-neonorange/10 border-neonorange border relative rounded p-1"
              >
                <h5
                  onClick={() => tglReadMore(index)}
                  className="text-white font-semibold"
                >
                  {item.name}
                </h5>
                <p onClick={() => tglReadMore(index)} className="text-white">
                  Description
                </p>
                <div
                  onClick={() => checkEquipped(item)}
                  className={`${
                    item?.equipped === true
                      ? "bg-neonpurple-500"
                      : "bg-transparent"
                  } w-5 h-5 cursor-pointer rounded-full border-neonpurple-500 border`}
                ></div>
                <div
                  className={`${
                    item.amount === 0 ? "flex" : "grid"
                  } grid-cols-3 ml-auto justify-items-center items-center gap-2 w-fit`}
                >
                  <button
                    onClick={() => countItemAmount(item)}
                    data-btn="plus"
                    className="bg-neongreen w-5 h-5 rounded flex justify-center items-center"
                  >
                    +
                  </button>
                  <span className="text-white">{item.amount}</span>
                  <button
                    onClick={() => countItemAmount(item)}
                    data-btn="minus"
                    className={`bg-neonred ${
                      item.amount === 0 ? "w-auto px-2" : "w-5"
                    } h-5 rounded flex justify-center items-center`}
                  >
                    {item.amount === 0 ? "remove" : "-"}
                  </button>
                </div>
                <div
                  onClick={() => tglReadMore(index)}
                  className={`${
                    readMore !== index && "hidden"
                  } col-span-3 pt-1`}
                >
                  <p className="text-gray-200">{item.description}</p>
                </div>
              </div>
            ))
          : equipment.map((item, index) => (
              <div
                key={item.id}
                className="grid text-base grid-cols-equipmentRow  justify-between cursor-pointer bg-neonorange/10 border-neonorange border relative rounded p-1"
              >
                <h5
                  onClick={() => tglReadMore(index)}
                  className="text-white font-semibold"
                >
                  {item.name}
                </h5>
                <p onClick={() => tglReadMore(index)} className="text-white">
                  Description
                </p>
                <div
                  onClick={() => checkEquipped(item)}
                  className={`${
                    item?.equipped === true
                      ? "bg-neonpurple-500"
                      : "bg-transparent"
                  } w-5 h-5 cursor-pointer rounded-full border-neonpurple-500 border`}
                ></div>
                <div
                  className={`${
                    item.amount === 0 ? "flex" : "grid"
                  } grid-cols-3 ml-auto justify-items-center items-center gap-2 w-fit`}
                >
                  <button
                    onClick={() => countItemAmount(item)}
                    data-btn="plus"
                    className="bg-neongreen w-5 h-5 rounded flex justify-center items-center"
                  >
                    +
                  </button>
                  <span className="text-white">{item.amount}</span>
                  <button
                    onClick={() => countItemAmount(item)}
                    data-btn="minus"
                    className={`bg-neonred ${
                      item.amount === 0 ? "w-auto px-2" : "w-5"
                    } h-5 rounded flex justify-center items-center`}
                  >
                    {item.amount === 0 ? "remove" : "-"}
                  </button>
                </div>
                <div
                  onClick={() => tglReadMore(index)}
                  className={`${
                    readMore !== index && "hidden"
                  } col-span-3 pt-1`}
                >
                  <p className="text-gray-200">{item.description}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Equipment;
