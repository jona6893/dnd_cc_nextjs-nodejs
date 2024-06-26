import SVG from "../ui_components/SVG";
import { useEffect, useState } from "react";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { updateCharacterDB } from "@/app/modules/apiCalls";
import { Card, CardBody } from "@nextui-org/react";

function WalkingSpeed({ character, updateCharacter }) {
  const [walkingSpeed, setWalkingSpeed] = useState(
    character?.walkingSpeed ?? 0
  );

  useEffect(() => {
    if (character) {
      setWalkingSpeed(character.walkingSpeed ?? 0);
    }
  }, [character]);

  function updateWalkingSpeed() {
    setWalkingSpeed(event.target.value);
    character.walkingSpeed = event.target.value;

    let update = {
      _id: character._id,
      update: {
        walkingSpeed: event.target.value,
        updated_by: epochToUtcDateTime(),
      },
    };
    // update context i.e local
    updateCharacter(character);
    // update database
    updateCharacterDB(update);
  }

  return (
    <Card className="dark w-24 h-28 border-neonred border">
      <CardBody className="grid gap-2 justify-items-center">
       
          <h4 className="h4-title">Walking</h4>
          <label className="relative group">
            <input
              onInput={updateWalkingSpeed}
              type="text"
              value={walkingSpeed}
              className="basic-input"
              placeholder="0"
            />
            <SVG />
          </label>
          <h4 className="h4-title">Speed</h4>
   
      </CardBody>
    </Card>
  );
}

export default WalkingSpeed;
