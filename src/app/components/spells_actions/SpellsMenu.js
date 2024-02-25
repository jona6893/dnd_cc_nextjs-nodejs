import { useContext, useEffect, useState } from "react";
import Spells from "./spells/Spells";
import Actions from "./actions/Actions";
import Extras from "./extras/Extras";
import Descriptions from "./descriptions/Descriptions";
import FeatureAndTraits from "./featureAndTraits/FeatureAndTraits";
import CharacterContext from "@/app/context/CharacterContext";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { updateCharacterDB } from "@/app/modules/apiCalls";
import StatsBar from "./spells/dc_modifier_attack/StatsBar";
import { Tabs, Tab } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";

function SpellsMenu() {
  const [menuBtn, setMenuBtn] = useState(0);
  const [popup, setPopup] = useState(false);
  const { character, updateCharacter } = useContext(CharacterContext);
  const [spellStats, setSpellStats] = useState(
    character?.spellStats ?? { modifier: 0, spellAttack: 0, saveDC: 0 }
  );
  const selBtn = "border-neonpurple-500 border rounded";
  const menuOptions = [
    "ACTIONS",
    "SPELLS",
    "EXTRA",
    "DESCRIPTIONS",
    "FEATURES & TRAITS",
  ];

  useEffect(() => {
    setSpellStats(
      character?.spellStats ?? { modifier: 0, spellAttack: 0, saveDC: 0 }
    );
    //console.log(character.savingThrow)
  }, [character]);

  function updatSpellStat(stat, value) {
    let newstat = { ...spellStats };

    newstat[stat] = parseInt(value);

    setSpellStats(newstat);

    character.spellStats = newstat;

    let update = {
      _id: character._id,
      update: {
        spellStats: newstat,
        updated_by: epochToUtcDateTime(),
      },
    };
    // update context i.e local
    updateCharacter(character);
    // update database
    updateCharacterDB(update);
  }

  return (
    <Card className="dark sm:w-[600px] min-w-[380px] max-sm:w-full max-h-[500px] border border-gray-50">
      <CardBody className="p-2">
        <section className="flex flex-col ">
          <Tabs
            aria-label="Options"
            classNames={{
              tabList:
                "dark mx-auto focus:outline-none focus:ring focus:ring-neonpurple-300",
              cursor:
                "w-full border-2 border-neonpurple-300 focus:outline-none focus:ring",
              /*     tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]", */
            }}
          >
            <Tab key="action" title="ACTIONS">
              <div className="w-full text-white overflow-y-auto">
                <Actions popup={popup} setPopup={setPopup} />
              </div>
            </Tab>
            <Tab key="spells" title="SPELLS" className="overflow-y-auto">
              <div className="w-full text-white overflow-y-auto">
                <StatsBar
                  updatSpellStat={updatSpellStat}
                  spellStats={spellStats}
                  setPopup={setPopup}
                  popup={popup}
                />
                <Spells popup={popup} setPopup={setPopup} />
              </div>
            </Tab>
            <Tab key="extras" title="EXTRAS">
              <div className="w-full text-white overflow-y-auto">
                <Extras />
              </div>
            </Tab>
            <Tab key="descriptions" title="DESCRIPTIONS">
              <div className="w-full text-white overflow-y-auto">
                <Descriptions />
              </div>
            </Tab>
            <Tab key="features_&_traits" title="FEATURES & TRAITS">
              <div className="w-full text-white overflow-y-auto">
                <FeatureAndTraits />
              </div>
            </Tab>
          </Tabs>
        </section>
      </CardBody>
    </Card>
  );
}

export default SpellsMenu;
