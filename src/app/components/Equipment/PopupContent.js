import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Input, Textarea } from "@nextui-org/react";

function PopupContent({
  popup,
  setPopup,
  updateEquipment,
  equipment,
  setEquipment,
  readMore,
  countItemAmount,
  tglReadMore,
}) {
  const [searching, setSearching] = useState(false);
  const [equipmentApi, setEquipmentApi] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDamage, setItemDamage] = useState("");
  const [itemDecs, setItemDecs] = useState("");
  // toggle search field
  function toggleSearch() {
    //console.log(event.target.value);
    if (event.target.value.length > 0) {
      setSearching(true);
      filterSearch(event.target.value);
      /*  equipmentApi.results.filter(function (str) {
        return str.includes(event.target.value);
      }); */
    } else {
      setSearching(false);
    }
  }

  // add new equipment
  function handleForm() {
    event.preventDefault();
    updateEquipment(itemName, itemDecs, null,itemDamage);
  }

  // rebuild to only request from backend on search input
  useEffect(() => {
    async function getEquipmentAPI() {
      const response = await fetch("https://www.dnd5eapi.co/api/equipment/");
      const data = await response.json();
      const open5e = await fetch(`https://www.dnd5eapi.co/api/magic-items`);
      const data5e = await open5e.json();
      const apiData = data.results.concat(data5e.results);

      //console.log(apiData)
      setEquipmentApi(apiData);
    }
    getEquipmentAPI();
  }, [popup]);

  function filterSearch(value) {
    const filtered = equipmentApi?.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEquipment(filtered);
  }

  async function addSearchedEquipment(item) {
    //console.log(item)
    let description = "";
    const url = item.url;
    const response = await fetch(`https://www.dnd5eapi.co${url}`);
    const data = await response.json();
    data.desc.forEach((desc) => {
      description += desc;
    });

    updateEquipment(data.name, description, data.url);
  }

  // search field popup all results
  const SearchResults = () => {
    return (
      <div className="absolute z-[100] bg-white rounded-md w-full top-full mt-2 left-0 h-fit max-h-80 border-neonorange border-2 overflow-auto">
        {filteredEquipment?.map((item) => {
          return (
            <div key={nanoid()}>
              <div className="flex gap-1 min-h-8 justify-between items-center hover:bg-gray-300 px-2 py-2">
                <span className="text-black">{item.name}</span>
                <button
                  onClick={() => addSearchedEquipment(item)}
                  className="bg-neongreen px-2 rounded"
                >
                  ADD
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full h-full">
      <button
        className="absolute top-4 right-6 text-white"
        onClick={() => setPopup(!popup)}
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
      <h2 className="h2-title">MANAGE EQUIPMENT</h2>
      <section className="w-full flex max-md:flex-col gap-4 overflow-auto">
        <div className="w-full">
          <div className="flex gap-4 border-b-2 w-full">
            <h4 className="h4-title w-fit whitespace-nowrap">ADD EQUIPMENT</h4>
            <label htmlFor="" className="flex gap-2 w-full relative">
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
                className="bg-transparent text-white text-base px-2 w-full"
                type="text"
                placeholder="SEARCH ITEMS"
                onBlur={() => {
                  setTimeout(() => {
                    setSearching(false);
                  }, 300);
                }}
                onFocus={() => {
                  setSearching(true);
                }}
                onInput={toggleSearch}
              />
              {searching && <SearchResults />}
            </label>
          </div>
          <form action="" className="grid gap-4 pt-4" onSubmit={handleForm}>
            <Input type="text" label="Item Name" onValueChange={setItemName} />
            <Input
              type="text"
              label="Item Damage - 1D8+6"
              onValueChange={setItemDamage}
            />
            <Textarea
              label="Item Description"
              placeholder="Item Description"
              className="w-full"
              onValueChange={setItemDecs}
            />

            <button
              type="submit"
              className="bg-neonpurple-400 hover:bg-neonpurple-500 px-6 py-3 rounded-xl w-full"
            >
              ADD ITEM
            </button>
          </form>
        </div>

        <div className="gap-4 w-full">
          <div className="border-b-2 w-full">
            <h4 className="h4-title ">All EQUIPMENT</h4>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            {equipment.map((item, index) => (
              <div
                key={nanoid()}
                className="grid text-base grid-cols-equipmentRowPopup  justify-between cursor-pointer bg-neonorange/10 border-neonorange border relative rounded-lg p-1"
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
      </section>
    </div>
  );
}

export default PopupContent;
