import CharacterContext from "@/app/context/CharacterContext";
import { useContext, useEffect, useState } from "react";
import Popup from "../../modals/Popup";
import ManageActions from "./ManageActions";
import { nanoid } from "nanoid";
import { saveCharacterData } from "@/app/modules/ElectronSaves";
import { getAC } from "@/app/modules/CalculateAcItems";

function Actions({ popup, setPopup }) {
  const { character } = useContext(CharacterContext);
  const [actions, setActions] = useState(character?.actions ?? []);
const { updateCharacter } = useContext(CharacterContext);

  async function getEquippedItems(item) {
    const url = item.url;
    const response = await fetch(`https://www.dnd5eapi.co${url}`);
    const data = await response.json();
    return data;
  }

  useEffect(() => {
    if (character) {
      setActions(character.actions ?? []);
      setTimeout(() => {
        async function buildActionArray() {
          const filtered = character?.equipment?.filter(
            (item) => item.equipped === true
          );

          if (filtered?.length !== character?.actions?.length) {
            //console.log("call api");

            const promises = filtered.map((e) => getEquippedItems(e));
            const newActions = await Promise.all(promises);

            setActions(newActions);
            const updatedCharacter = { ...character, actions: newActions };
            updateCharacter(updatedCharacter);
            saveCharacterData(updatedCharacter, character.id);
          }
        }

        buildActionArray();
      }, 1);

    }

  }, [character]);



  return (
    <div className="w-full grid gap-2 mt-2">
      {popup && (
        <Popup>
          <ManageActions
            popup={popup}
            setPopup={setPopup}
            character={character}
            setActions={setActions}
            actions={actions}
          />
        </Popup>
      )}
      <section className="flex flex-col gap-2">
        <ul className="grid grid-cols-actionsRow text-sm">
          <li>Item</li>
          <li>DMG/AC</li>
          <li>Type</li>
          <li className="text-end">Range</li>
        </ul>
        {actions?.map((item) => {
          const damageDice = item.damage?.damage_dice;
          const damageType = item.damage?.damage_type?.name;
          const TwohandedDamage = item.two_handed_damage?.damage_dice;
          const ac = item.armor_class;
          const rangeNormal = item.range?.normal;
          const rangeLong = item.range?.long;
    

          return (
            <div
              key={item.index}
              className="border-brute bg-brute/10 border w-full rounded grid grid-cols-actionsRow gap-2 px-2 py-1 cursor-pointer"
            >
              <h4 className="h4-title font-bold">{item.name}</h4>
              <p className="text-sm">
                {damageDice}
                {TwohandedDamage && ", 2-hand " + TwohandedDamage}
                {ac && "AC: " + "+" + ac.base}
              </p>
              <p className="text-sm">
                {damageType}
                {ac?.dex_bonus === true && "Dex bonus"}
                {item.armor_category === "Medium" && ", Max = " + ac.max_bonus}
              </p>
              <p className="text-end text-sm">
                {rangeNormal && rangeNormal + "ft"}
                {rangeLong && ", " + rangeLong + "ft"}
            
              </p>
            </div>
          );
})}
      </section>
    </div>
  );
}

export default Actions;
