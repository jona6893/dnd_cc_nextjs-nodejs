import CharacterContext from "@/app/context/CharacterContext";
import { createCharacters } from "@/app/modules/apiCalls";
import { Input } from "@nextui-org/react";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { nanoid } from "nanoid";
import { useContext, useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
function CreateCharacter({ userInfo }) {
  const [nameSlct, setNameSlct] = useState(null);
  const [raceSlct, setRaceSlct] = useState(null);
  const [classSlct, setClassSlct] = useState(null);
  const [subclassSlct, setSubclassSlct] = useState(null);
  const [levelSlct, setLevelSlct] = useState(null);
  const [alignmentSlct, setAlignmentSlct] = useState(null);
  const { updateCharacter } = useContext(CharacterContext);
  const races = [
    { value: "Dwarv" },
    { value: "Elv" },
    { value: "Halfling" },
    { value: "Human" },
    { value: "Dragonborn" },
    { value: "Gnome" },
    { value: "Half-elv" },
    { value: "Half-orc" },
    { value: "Tiefling" },
  ];
  const classes = [
    { value: "Artificer" },
    { value: "Barbarian" },
    { value: "Bard" },
    { value: "Cleric" },
    { value: "Druid" },
    { value: "Fighter" },
    { value: "Monk" },
    { value: "Paladin" },
    { value: "Ranger" },
    { value: "Rogue" },
    { value: "Sorcerer" },
    { value: "Warlock" },
    { value: "Wizard" },
  ];
  const alignment = [
    { value: "Lawful Good" },
    { value: "Good" },
    { value: "Neutral" },
    { value: "Evil" },
    { value: "Chaotic Evil" },
  ];
  const subclasses = [
    { value: "Path of the Berserker (Barbarian)" },
    { value: "Path of the Totem Warrior (Barbarian)" },
    { value: "College of Lore (Bard)" },
    { value: "College of Valor (Bard)" },
    { value: "Knowledge Domain (Cleric)" },
    { value: "Life Domain (Cleric)" },
    { value: "Light Domain (Cleric)" },
    { value: "Nature Domain (Cleric)" },
    { value: "Tempest Domain (Cleric)" },
    { value: "Trickery Domain (Cleric)" },
    { value: "War Domain (Cleric)" },
    { value: "Circle of the Land (Druid)" },
    { value: "Circle of the Moon (Druid)" },
    { value: "Champion (Fighter)" },
    { value: "Battle Master (Fighter)" },
    { value: "Eldritch Knight (Fighter)" },
    { value: "Way of the Open Hand (Monk)" },
    { value: "Way of Shadow (Monk)" },
    { value: "Way of the Four Elements (Monk)" },
    { value: "Oath of Devotion (Paladin)" },
    { value: "Oath of the Ancients (Paladin)" },
    { value: "Oath of Vengeance (Paladin)" },
    { value: "Hunter (Ranger)" },
    { value: "Beast Master (Ranger)" },
    { value: "Thief (Rogue)" },
    { value: "Assassin (Rogue)" },
    { value: "Arcane Trickster (Rogue)" },
    { value: "Draconic Bloodline (Sorcerer)" },
    { value: "Wild Magic (Sorcerer)" },
    { value: "The Archfey (Warlock)" },
    { value: "The Fiend (Warlock)" },
    { value: "The Great Old One (Warlock)" },
    { value: "School of Abjuration (Wizard)" },
    { value: "School of Conjuration (Wizard)" },
    { value: "School of Divination (Wizard)" },
    { value: "School of Enchantment (Wizard)" },
    { value: "School of Evocation (Wizard)" },
    { value: "School of Illusion (Wizard)" },
    { value: "School of Necromancy (Wizard)" },
    { value: "School of Transmutation (Wizard)" },
    { value: "Death Domain (Cleric)" },
    { value: "Oathbreaker (Paladin)" },
    { value: "Path of the Battlerager (Barbarian)" },
    { value: "Arcana Domain (Cleric)" },
    { value: "Purple Dragon Knight (Fighter)" },
    { value: "Way of the Long Death (Monk)" },
    { value: "Way of the Sun Soul (Monk)" },
    { value: "Oath of the Crown (Paladin)" },
    { value: "Mastermind (Rogue)" },
    { value: "Swashbuckler (Rogue)" },
    { value: "Storm Sorcery (Sorcerer)" },
    { value: "The Undying (Warlock)" },
    { value: "Bladesinging (Wizard)" },
    { value: "Pyromancer (Sorcerer)" },
    { value: "Solidarity Domain (Cleric)" },
    { value: "Strength Domain (Cleric)" },
    { value: "Ambition Domain (Cleric)" },
    { value: "Zeal Domain (Cleric)" },
    { value: "Path of the Ancestral Guardian (Barbarian)" },
    { value: "Path of the Storm Herald (Barbarian)" },
    { value: "Path of the Zealot (Barbarian)" },
    { value: "College of Glamour (Bard)" },
    { value: "College of Swords (Bard)" },
    { value: "College of Whispers (Bard)" },
    { value: "Forge Domain (Cleric)" },
    { value: "Grave Domain (Cleric)" },
    { value: "Circle of Dreams (Druid)" },
    { value: "Circle of the Shepherd (Druid)" },
    { value: "Arcane Archer (Fighter)" },
    { value: "Cavalier (Fighter)" },
    { value: "Samurai (Fighter)" },
    { value: "Way of the Drunken Master (Monk)" },
    { value: "Way of the Kensei (Monk)" },
    { value: "Oath of Conquest (Paladin)" },
    { value: "Oath of Redemption (Paladin)" },
    { value: "Gloom Stalker (Ranger)" },
    { value: "Horizon Walker (Ranger)" },
    { value: "Monster Slayer (Ranger)" },
    { value: "Inquisitive (Rogue)" },
    { value: "Scout (Rogue)" },
    { value: "Divine Soul (Sorcerer)" },
    { value: "Shadow Magic (Sorcerer)" },
    { value: "The Celestial (Warlock)" },
    { value: "The Hexblade (Warlock)" },
    { value: "War Magic (Wizard)" },
    { value: "Order Domain (Cleric)" },
    { value: "Circle of Spores (Druid)" },
    { value: "Alchemist (Artificer)" },
    { value: "Artillerist (Artificer)" },
    { value: "Battle Smith (Artificer)" },
    { value: "Echo Knight (Fighter)" },
    { value: "Chronurgy Magic (Wizard)" },
    { value: "Graviturgy Magic (Wizard)" },
    { value: "College of Eloquence (Bard)" },
    { value: "Oath of Glory (Paladin)" },
    { value: "Armorer (Artificer)" },
    { value: "Path of the Beast (Barbarian)" },
    { value: "Path of Wild Magic (Barbarian)" },
    { value: "College of Creation (Bard)" },
    { value: "Peace Domain (Cleric)" },
    { value: "Twilight Domain (Cleric)" },
    { value: "Circle of Stars (Druid)" },
    { value: "Circle of Wildfire (Druid)" },
    { value: "Psi Warrior (Fighter)" },
    { value: "Rune Knight (Fighter)" },
    { value: "Way of Mercy (Monk)" },
    { value: "Way of the Astral Self (Monk)" },
    { value: "Oath of the Watchers (Paladin)" },
    { value: "Fey Wanderer (Ranger)" },
    { value: "Swarmkeeper (Ranger)" },
    { value: "Phantom (Rogue)" },
    { value: "Soulknife (Rogue)" },
    { value: "Aberrant Mind (Sorcerer)" },
    { value: "Clockwork Soul (Sorcerer)" },
    { value: "The Fathomless (Warlock)" },
    { value: "The Genie (Warlock)" },
    { value: "Order of Scribes (Wizard)" },
    { value: "Lunar Sorcery (Sorcerer)" },
  ];
  const subclassesSort = subclasses.sort();

  async function saveCharacter() {
    event.preventDefault();
    let name = nameSlct;
    let race = raceSlct;
    let klass = classSlct;
    let subClass = subclassSlct;
    let level = levelSlct;
    let alignment = alignmentSlct;

    const _id = nanoid();
    let characterData = {
      userId: userInfo.id,
      _id,
      name,
      race,
      class: klass,
      subClass,
      level,
      alignment,
      created_by: epochToUtcDateTime(),
    };
    //console.log(characterData);
    // save to DB
    const character = await createCharacters(characterData);
    updateCharacter(character[0]);
  }

  const onSelectionChange = (value, id) => {
    if (value === "race") {
      setRaceSlct(id);
    }
    if (value === "class") {
      setClassSlct(id);
    }
    if (value === "subclass") {
      setSubclassSlct(id);
    }
    if (value === "alignment") {
      setAlignmentSlct(id);
    }
  };

  const onInputChange = (id, value) => {
    if (id === "race") {
      setRaceSlct(value);
    }
    if (id === "class") {
      setClassSlct(value);
    }
    if (id === "subclass") {
      setSubclassSlct(value);
    }
    if (id === "alignment") {
      setAlignmentSlct(value);
    }
  };

  return (
    <div className="text-white flex flex-col items-center mt-4 h-full">
      <form
        className="flex flex-col justify-center ite gap-y-4 gap-4 w-80"
        action=""
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        onSubmit={saveCharacter}
      >
        <label className="w-full relative">
          <Input
            type="text"
            label="Name"
            placeholder="Enter Character Name"
            isRequired
            onValueChange={setNameSlct}
          />
        </label>
        <Autocomplete
          label="Choose a Race"
          className="max-w-xs"
          isRequired
          allowsCustomValue={true}
          onSelectionChange={(id) => onSelectionChange("race", id)}
          onInputChange={(value) => onInputChange("race", value)}
        >
          {races.map((race) => (
            <AutocompleteItem key={race.value} value={race.value}>
              {race.value}
            </AutocompleteItem>
          ))}
        </Autocomplete>

        <Autocomplete
          isRequired
          label="Choose a Class"
          className="max-w-xs"
          allowsCustomValue={true}
          onSelectionChange={(id) => onSelectionChange("class", id)}
          onInputChange={(value) => onInputChange("class", value)}
        >
          {classes.map((clas) => (
            <AutocompleteItem key={clas.value} value={clas.value}>
              {clas.value}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <Autocomplete
          label="Choose a SubClass"
          className="max-w-xs"
          allowsCustomValue={true}
          onSelectionChange={(id) => onSelectionChange("subclass", id)}
          onInputChange={(value) => onInputChange("subclass", value)}
        >
          {subclassesSort.map((subclass) => (
            <AutocompleteItem key={subclass.value} value={subclass.value}>
              {subclass.value}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <label>
          <Input
            isRequired
            type="number"
            label="Level"
            placeholder="Enter Character Level"
            onValueChange={setLevelSlct}
          />
        </label>
        <Autocomplete
          label="Choose an Alignment"
          className="max-w-xs"
          allowsCustomValue={true}
          onSelectionChange={(id) => onSelectionChange("alignment", id)}
          onInputChange={(value) => onInputChange("alignment", value)}
        >
          {alignment.map((align) => (
            <AutocompleteItem key={align.value} value={align.value}>
              {align.value}
            </AutocompleteItem>
          ))}
        </Autocomplete>
        <button
          type="submit"
          className="bg-neonpurple-400 hover:bg-neonpurple-500 px-6 py-1 rounded"
        >
          Create character
        </button>
      </form>
    </div>
  );
}

export default CreateCharacter;
