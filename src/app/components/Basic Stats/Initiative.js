import { useEffect, useState } from "react";
import SVG from "../ui_components/SVG";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { updateCharacterDB } from "@/app/modules/apiCalls";
import { Card, CardBody } from "@nextui-org/react";

function Initiative({ character, updateCharacter }) {
  const [ini, setIni] = useState(character?.initiative ?? 0);

  useEffect(() => {
    if (character) {
      setIni(character.initiative ?? 0);
    }
  }, [character]);

  function updateInitiative() {
    setIni(event.target.value);
    character.initiative = event.target.value;

    let update = {
      _id: character._id,
      update: {
        initiative: event.target.value,
        updated_by: epochToUtcDateTime(),
      },
    };
    // update context i.e local
    updateCharacter(character);
    // update database
    updateCharacterDB(update);
    //console.log(character);
  }

  return (
    <Card className="dark w-24 h-28 border-neonred border">
      <CardBody className="flex flex-col items-center justify-end">
        
          <label className="relative group">
            <input
              onInput={updateInitiative}
              type="text"
              value={ini === 0 ? "" : ini}
              className="basic-input"
              placeholder="0"
            />
            <SVG />
          </label>
          <h4 className="h4-title">Initiative</h4>
        
      </CardBody>
    </Card>
  );
}

export default Initiative;
