import { nanoid } from "nanoid";

function PreviewSpell({ previewSpell }) {

    console.log(previewSpell)
 
        //console.log(previewSpell);
 
  return (
    <div className="flex flex-col gap-2 mt-2">
      {previewSpell?.desc && (
        <p>
          <span className="h4-title">Description: </span>
          {previewSpell.desc}
        </p>
      )}
      {previewSpell?.range && (
        <p>
          <span className="h4-title">Range: </span>
          {previewSpell.range}
        </p>
      )}
      {previewSpell?.duration && (
        <p>
          <span className="h4-title">Duration: </span>
          {previewSpell.duration}
        </p>
      )}
      {previewSpell?.concentration && (
        <p>
          <span className="h4-title">Concentration: </span>
          {previewSpell.concentration}
        </p>
      )}
      {previewSpell?.casting_time && (
        <p>
          <span className="h4-title">Casting Time: </span>
          {previewSpell.casting_time}
        </p>
      )}
      {previewSpell?.casting_time && (
        <p>
          <span className="h4-title">Level: </span>
          {previewSpell.casting_time}
        </p>
      )}
      {previewSpell?.damage?.damage_at_slot_level && (
        <p>
          <span className="h4-title">Damage at Level: </span>
          {Object.entries(previewSpell.damage.damage_at_slot_level).map(
            (dmg) => {
              return (
                <span key={nanoid()}>
                  Level {dmg[0]}: {dmg[1]},{" "}
                </span>
              ); 
            }
          )}
        </p>
      )}
      {previewSpell?.damage?.damage_at_character_level && (
        <p>
          <span className="h4-title">Damage at Level: </span>
          {Object.entries(previewSpell.damage.damage_at_character_level).map(
            (dmg) => {
              return (
                <span key={nanoid()}>
                  Level {dmg[0]}: {dmg[1]},{" "}
                </span>
              );
            }
          )}
        </p>
      )}
      {previewSpell?.damage?.damage_type && (
        <p>
          <span className="h4-title">Damage Type: </span>
          {previewSpell.damage.damage_type.name}
        </p>
      )}
      {previewSpell?.higher_level && (
        <p>
          <span className="h4-title">At Higher Levels: </span>
          {previewSpell.higher_level}
        </p>
      )}
    </div>
  );
}

export default PreviewSpell