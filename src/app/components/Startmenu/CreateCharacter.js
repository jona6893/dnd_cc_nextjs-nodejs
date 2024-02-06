import { nanoid } from "nanoid";
import { useState } from "react";



function CreateCharacter({ userInfo }) {
  const [inputFocus, setInputFocus] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const races = [
    "Dwarv",
    "Elv",
    "Halfling",
    "Human",
    "Dragonborn",
    "Gnome",
    "Half-elv",
    "Half-orc",
    "Tiefling",
  ];
  const classes = [
    "Artificer",
    "Barbarian",
    "Bard",
    "Cleric",
    "Druid",
    "Fighter",
    "Monk",
    "Paladin",
    "Ranger",
    "Rogue",
    "Sorcerer",
    "Warlock",
    "Wizard",
  ];
  const alignment = ["Lawful Good", "Good", "Neutral", "Evil", "Chaotic Evil"];
  const subclasses = [
    "Path of the Berserker (Barbarian)",
    "Path of the Totem Warrior (Barbarian)",
    "College of Lore (Bard)",
    "College of Valor (Bard)",
    "Knowledge Domain (Cleric)",
    "Life Domain (Cleric)",
    "Light Domain (Cleric)",
    "Nature Domain (Cleric)",
    "Tempest Domain (Cleric)",
    "Trickery Domain (Cleric)",
    "War Domain (Cleric)",
    "Circle of the Land (Druid)",
    "Circle of the Moon (Druid)",
    "Champion (Fighter)",
    "Battle Master (Fighter)",
    "Eldritch Knight (Fighter)",
    "Way of the Open Hand (Monk)",
    "Way of Shadow (Monk)",
    "Way of the Four Elements (Monk)",
    "Oath of Devotion (Paladin)",
    "Oath of the Ancients (Paladin)",
    "Oath of Vengeance (Paladin)",
    "Hunter (Ranger)",
    "Beast Master (Ranger)",
    "Thief (Rogue)",
    "Assassin (Rogue)",
    "Arcane Trickster (Rogue)",
    "Draconic Bloodline (Sorcerer)",
    "Wild Magic (Sorcerer)",
    "The Archfey (Warlock)",
    "The Fiend (Warlock)",
    "The Great Old One (Warlock)",
    "School of Abjuration (Wizard)",
    "School of Conjuration (Wizard)",
    "School of Divination (Wizard)",
    "School of Enchantment (Wizard)",
    "School of Evocation (Wizard)",
    "School of Illusion (Wizard)",
    "School of Necromancy (Wizard)",
    "School of Transmutation (Wizard)",
    "Death Domain (Cleric)",
    "Oathbreaker (Paladin)",
    "Path of the Battlerager (Barbarian)",
    "Arcana Domain (Cleric)",
    "Purple Dragon Knight (Fighter)",
    "Way of the Long Death (Monk)",
    "Way of the Sun Soul (Monk)",
    "Oath of the Crown (Paladin)",
    "Mastermind (Rogue)",
    "Swashbuckler (Rogue)",
    "Storm Sorcery (Sorcerer)",
    "The Undying (Warlock)",
    "Bladesinging (Wizard)",
    "Pyromancer (Sorcerer)",
    "Solidarity Domain (Cleric)",
    "Strength Domain (Cleric)",
    "Ambition Domain (Cleric)",
    "Zeal Domain (Cleric)",
    "Path of the Ancestral Guardian (Barbarian)",
    "Path of the Storm Herald (Barbarian)",
    "Path of the Zealot (Barbarian)",
    "College of Glamour (Bard)",
    "College of Swords (Bard)",
    "College of Whispers (Bard)",
    "Forge Domain (Cleric)",
    "Grave Domain (Cleric)",
    "Circle of Dreams (Druid)",
    "Circle of the Shepherd (Druid)",
    "Arcane Archer (Fighter)",
    "Cavalier (Fighter)",
    "Samurai (Fighter)",
    "Way of the Drunken Master (Monk)",
    "Way of the Kensei (Monk)",
    "Oath of Conquest (Paladin)",
    "Oath of Redemption (Paladin)",
    "Gloom Stalker (Ranger)",
    "Horizon Walker (Ranger)",
    "Monster Slayer (Ranger)",
    "Inquisitive (Rogue)",
    "Scout (Rogue)",
    "Divine Soul (Sorcerer)",
    "Shadow Magic (Sorcerer)",
    "The Celestial (Warlock)",
    "The Hexblade (Warlock)",
    "War Magic (Wizard)",
    "Order Domain (Cleric)",
    "Circle of Spores (Druid)",
    "Alchemist (Artificer)",
    "Artillerist (Artificer)",
    "Battle Smith (Artificer)",
    "Echo Knight (Fighter)",
    "Chronurgy Magic (Wizard)",
    "Graviturgy Magic (Wizard)",
    "College of Eloquence (Bard)",
    "Oath of Glory (Paladin)",
    "Armorer (Artificer)",
    "Path of the Beast (Barbarian)",
    "Path of Wild Magic (Barbarian)",
    "College of Creation (Bard)",
    "Peace Domain (Cleric)",
    "Twilight Domain (Cleric)",
    "Circle of Stars (Druid)",
    "Circle of Wildfire (Druid)",
    "Psi Warrior (Fighter)",
    "Rune Knight (Fighter)",
    "Way of Mercy (Monk)",
    "Way of the Astral Self (Monk)",
    "Oath of the Watchers (Paladin)",
    "Fey Wanderer (Ranger)",
    "Swarmkeeper (Ranger)",
    "Phantom (Rogue)",
    "Soulknife (Rogue)",
    "Aberrant Mind (Sorcerer)",
    "Clockwork Soul (Sorcerer)",
    "The Fathomless (Warlock)",
    "The Genie (Warlock)",
    "Order of Scribes (Wizard)",
    "Lunar Sorcery (Sorcerer)",
  ];
  const subclassesSort = subclasses.sort();
  async function saveCharacter() {
    event.preventDefault();
    let name = event.target.name.value;
    let race = event.target.race.value;
    let klass = event.target.class.value;
    let subClass = event.target.subClass.value;
    let level = event.target.level.value;
    let alignment = event.target.alignment.value;

    const _id = nanoid();
    let characterData = {
      userId:userInfo.id,
      _id,
      name,
      race,
      class: klass,
      subClass,
      level,
      alignment,
    };

    console.log(characterData);

    const apiUrl = "http://62.198.182.210:8081/api/create-character";
    const apiKey = "myapikey";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(characterData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data received:", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return false;
    }
  }

  function updateFocus(e) {
    setTimeout(() => {
      setInputFocus(e);
      setShowAutocomplete(true);
    }, 51);
  }

  function handleAutocompleteClick(value) {
    if (inputFocus.target) {
      inputFocus.target.value = value;
    }
    setShowAutocomplete(false);
  }

  function handleBlur() {
    // Delay hiding the autocomplete to allow time for onClick to fire inside the component

    setTimeout(() => {
      if (showAutocomplete) {
        console.log("blur song2");
        setShowAutocomplete(false);
        setInputFocus("");
      }
    }, 299);
  }

  const Autocomplete = ({ list }) => {
    return (
      <div className="w-full z-[1] min-h-[15rem] max-h-96 overflow-auto bg-slate-50 absolute top-full left-0 rounded-md">
        {list.map((e) => (
          <p
            key={nanoid()}
            onClick={() => handleAutocompleteClick(e)}
            className="text-black w-full border-none bg-transparent hover:bg-gray-200 p-2"
          >
            {e}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="text-white flex flex-col items-center mt-4 h-full">
      <form
        className="flex flex-col justify-center ite gap-y-4 gap-4 w-80"
        action=""
        onSubmit={saveCharacter}
      >
        <label className="w-full relative">
          Name
          <input
            className="bg-transparent border-b border-white w-full"
            type="text"
            name="name"
            id=""
            required
          />
        </label>
        <label className="relative">
          Race
          <input
            className="bg-transparent border-b border-white w-full"
            type="text"
            name="race"
            onFocus={updateFocus}
            onBlur={handleBlur}
            id="race"
            required
          />
          {inputFocus?.target?.name === "race" && <Autocomplete list={races} />}
        </label>

        <label className="relative">
          Class
          <input
            className="bg-transparent border-b border-white w-full"
            type="text"
            name="class"
            onFocus={updateFocus}
            onBlur={handleBlur}
            id=""
            required
          />
          {inputFocus?.target?.name === "class" && (
            <Autocomplete list={classes} />
          )}
        </label>
        <label className="relative">
          SubClass
          <input
            className="bg-transparent border-b border-white w-full"
            type="text"
            name="subClass"
            onFocus={updateFocus}
            onBlur={handleBlur}
            id=""
            required
          />
          {inputFocus?.target?.name === "subClass" && (
            <Autocomplete list={subclassesSort} />
          )}
        </label>
        <label>
          Level
          <input
            className="bg-transparent border-b border-white w-full"
            type="text"
            name="level"
            id=""
            required
          />
        </label>
        <label className="relative">
          Alignment
          <input
            className="bg-transparent border-b border-white w-full"
            type="text"
            name="alignment"
            onFocus={updateFocus}
            onBlur={handleBlur}
            id=""
            required
          />
          {inputFocus?.target?.name === "alignment" && (
            <Autocomplete list={alignment} />
          )}
        </label>
        <button type="submit">Create character</button>
      </form>
    </div>
  );
}

export default CreateCharacter




