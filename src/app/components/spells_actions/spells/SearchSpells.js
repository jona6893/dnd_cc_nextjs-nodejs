import { useEffect, useState } from "react";

function SearchSpells({ popup, setPreviewSpell, updateSpells }) {
  const [searching, setSearching] = useState(false);
  const [spellsApi, setSpellsApi] = useState([]);
  const [filteredSpells, setFilteredSpells] = useState([]);

  function toggleSearch() {
    //console.log(event.target.value);
    if (event.target.value.length > 0) {
      setSearching(true);
      filterSearch(event.target.value);
      /*  spellsApi.results.filter(function (str) {
        return str.includes(event.target.value);
      }); */
    } else {
      setSearching(false);
    }
  }

  function filterSearch(value) {
    const filtered = spellsApi.results?.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSpells(filtered);
  }

  useEffect(() => {
    async function getSpellsAPI() {
      const response = await fetch("https://www.dnd5eapi.co/api/spells/");
      const data = await response.json();
      //console.log(data);
      setSpellsApi(data);
    }
    getSpellsAPI();
  }, [searching]);

  async function getSpell(item) {
    const url = item.url;
    const response = await fetch(`https://www.dnd5eapi.co${url}`);
    const data = await response.json();
    setPreviewSpell(data);
  }

  async function addSpellToKnown(item) {
    const url = item.url;
    const response = await fetch(`https://www.dnd5eapi.co${url}`);
    const data = await response.json();
    //console.log(data);
    updateSpells(data);
  }


  return (
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
            if (searching !== false) {
              setSearching(false);
            }
          }, 100);
        }}
        onFocus={() => {
          setSearching(true);
        }}
        onInput={toggleSearch}
      />
      {/* {searching && <SearchResults />} */}
      {searching && (
        <div
          id="filteredSearch"
          className="absolute z-10 bg-white rounded-md w-full top-full mt-2 left-0 h-fit max-h-80 border-neonorange border-2 text-black overflow-auto"
        >
          {filteredSpells?.map((item) => {
            return (
              <div key={item.name}>
                <div
                  onClick={() => getSpell(item)}
                  className="flex gap-1 min-h-8 justify-between items-center hover:bg-gray-300 px-2 py-2"
                >
                  <span>{item.name}</span>
                  <button
                    onClick={(e) => {
                      //e.stopPropagation();
                      addSpellToKnown(item);
                    }}
                    className="bg-neongreen px-2 rounded"
                  >
                    ADD
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </label>
  );
}

export default SearchSpells;
