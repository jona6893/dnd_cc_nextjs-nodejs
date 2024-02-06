/* // to save a character in main.js as a .json file
export const saveCharacterData = (characterData, characterId) => {
  window.electronAPI.saveCharacterData(characterData, characterId);
};

// load character based on characterId, currently the Id is the name of the .json file
export const loadCharacterData = (characterId) => {
  window.electronAPI.loadCharacterData(characterId);
  // ... handle response ...
};
export const deleteCharacterData = (characterId) => {
  window.electronAPI.deleteCharacterData(characterId);
  // ... handle response ...
};
export const exportCharacterData = (characterId) => {
  window.electronAPI.exportCharacterData(characterId);
  // ... handle response ...
};

// get all .json files, each file is a character.
export const listCharacters = () => {
  window.electronAPI.listCharacters();
  // ... handle response ...
};
 */
// Sort By Functions

export function compareBySpelllevel(spell1, spell2) {
  let spelllevel1 = spell1.spellLevel;
  let spelllevel2 = spell2.spellLevel;
  if (spelllevel1 < spelllevel2) {
    return -1;
  }
  if (spelllevel1 > spelllevel2) {
    return 1;
  }
  return 0;
}
export function compareByCharacterName(charcter1, character2) {
  let spelllevel1 = charcter1.name;
  let spelllevel2 = character2.name;
  if (spelllevel1 < spelllevel2) {
    return -1;
  }
  if (spelllevel1 > spelllevel2) {
    return 1;
  }
  return 0;
}
