import { useEffect, useState } from "react";
import SVG from "../ui_components/SVG";
import { Card, CardBody } from "@nextui-org/react";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { updateCharacterDB } from "@/app/modules/apiCalls";

function Inspiration({ character, updateCharacter }) {
  const [insp, setInsp] = useState(character?.inspiration ?? 0);

  useEffect(() => {
    if (character) {
      setInsp(character.inspiration ?? 0);
    }
  }, [character]);

  function updateInspiration() {
    setInsp(event.target.value);
    character.inspiration = event.target.value;

    let update = {
      _id: character._id,
      update: {
        inspiration: event.target.value,
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
    <Card className="dark w-[156px] h-14 border-neonred border">
      <CardBody className="">
        <div className="flex justify-between items-center gap-2 justify-items-center">
          <h4 className="h4-title leading-tight">Inspiration</h4>
          <label className="relative group">
            <input
              onInput={updateInspiration}
              type="text"
              className="basic-input"
              value={insp === 0 ? "" : insp}
              placeholder="0"
            />
            <SVG />
          </label>
        </div>
      </CardBody>
    </Card>
  );
}

export default Inspiration;
