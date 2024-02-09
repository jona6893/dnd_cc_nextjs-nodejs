import CharacterContext from "@/app/context/CharacterContext";

import { updateCharacterDB } from "@/app/modules/apiCalls";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { useContext, useEffect, useState } from "react";
import {
  BtnBold,
  BtnItalic,
  Editor,
  EditorProvider,
  Toolbar,
  BtnRedo,
  BtnStrikeThrough,
  BtnUndo,
  BtnUnderline,
} from "react-simple-wysiwyg";

function Descriptions() {
  const { character, updateCharacter } = useContext(CharacterContext);
    const [value, setValue] = useState(character?.descriptions ?? {personalityTraits: "", ideals:"", bonds:"", flaws:""});

  useEffect(() => {
    if (character) {
      setValue(
        character?.descriptions ?? {
          personalityTraits: "",
          ideals: "",
          bonds: "",
          flaws: "",
        }
      );
    }
  }, [character]);

    function onChange(key,e) {
      
      let newstate = {...value}

      newstate[key] = removeStyleAttribute(e.target.value)
      setValue(newstate);
      character.descriptions = newstate
      
      let update = {
        _id: character._id,
        update: {
          descriptions: newstate,
          updated_by: epochToUtcDateTime(),
        },
      };
      // update context i.e local
      updateCharacter(character);
      // update database
      updateCharacterDB(update);
    }
//remove style tag
function removeStyleAttribute(htmlString) {
  // Use a regular expression to match the style attribute and its values
  const regex = /<[^>]*?\s+style\s*=\s*['"]([^'"]*?)['"][^>]*>/g;

  // Replace the matched style attribute with an empty string
  const modifiedHtmlString = htmlString.replace(regex, "");

  return modifiedHtmlString;
}


  
    //console.log(value)
  return (
    <div className="mt-2 grid gap-2 text-sm">
      <EditorProvider>
        <Editor
          value={value.personalityTraits}
          onChange={(e) => onChange("personalityTraits", e)}
        >
          <Toolbar>
            <h4 className="text-base font-almendra font-bold text-black px-4">
              PERSONALITY TRAITS
            </h4>
            <BtnRedo />
            <BtnUndo />
            <BtnBold />
            <BtnItalic />
            <BtnStrikeThrough />
            <BtnUnderline />
          </Toolbar>
        </Editor>
      </EditorProvider>
      <EditorProvider>
        <Editor value={value.ideals} onChange={(e) => onChange("ideals", e)}>
          <Toolbar>
            <h4 className="text-base font-almendra font-bold text-black px-4">
              IDEALS
            </h4>
            <BtnRedo />
            <BtnUndo />
            <BtnBold />
            <BtnItalic />
            <BtnStrikeThrough />
            <BtnUnderline />
          </Toolbar>
        </Editor>
      </EditorProvider>
      <EditorProvider>
        <Editor value={value.bonds} onChange={(e) => onChange("bonds", e)}>
          <Toolbar>
            <h4 className="text-base font-almendra font-bold text-black px-4">
              BONDS
            </h4>
            <BtnRedo />
            <BtnUndo />
            <BtnBold />
            <BtnItalic />
            <BtnStrikeThrough />
            <BtnUnderline />
          </Toolbar>
        </Editor>
      </EditorProvider>
      <EditorProvider>
        <Editor value={value.flaws} onChange={(e) => onChange("flaws", e)}>
          <Toolbar>
            <h4 className="text-base font-almendra font-bold text-black px-4">
              FLAWS
            </h4>
            <BtnRedo />
            <BtnUndo />
            <BtnBold />
            <BtnItalic />
            <BtnStrikeThrough />
            <BtnUnderline />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default Descriptions;



