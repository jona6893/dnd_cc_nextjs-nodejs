import CharacterContext from "@/app/context/CharacterContext";
import { saveCharacterData } from "@/app/modules/ElectronSaves";
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

function FeatureAndTraits() {
  const { character } = useContext(CharacterContext);
  const [value, setValue] = useState(
    character?.featuresAndTraits ?? {
      features: [],
      traits: "",
    }
  );
  const [features, setFeatures] = useState([]);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (character) {
      setValue(
        character?.featuresAndTraits ?? {
          features: [],
          traits: "",
        }
      );
    }
  }, [character]);

  function onChange(key, e) {
    let newstate = { ...value };
    newstate[key] = removeStyleAttribute(e.target.value)
    setValue(newstate);
    character.featuresAndTraits = newstate;
    saveCharacterData(character, character.id);
  }
  //remove style tag
  function removeStyleAttribute(htmlString) {
    // Use a regular expression to match the style attribute and its values
    const regex = /<[^>]*?\s+style\s*=\s*['"]([^'"]*?)['"][^>]*>/g;

    // Replace the matched style attribute with an empty string
    const modifiedHtmlString = htmlString.replace(regex, "");

    return modifiedHtmlString;
  }

  useEffect(() => {
    async function getFeatures() {
      const url = "/api/features";
      const response = await fetch(`https://www.dnd5eapi.co${url}`);
      const data = await response.json();
      console.log(data);
      setFeatures(data.results);
    }
    getFeatures();
  }, []);

  async function addFeature(url) {
    const response = await fetch(`https://www.dnd5eapi.co${url}`);
    const feat = await response.json();
    let newstate = { ...value };
    newstate.features = [...newstate.features, feat];
    setValue(newstate);
    character.featuresAndTraits = newstate;
    saveCharacterData(character, character.id);
    console.log(newstate);
  }
  function removeFeature(index) {
    let newstate = { ...value };
    newstate.features.splice(index, 1);
    setValue(newstate);
    console.log(newstate);
    character.featuresAndTraits = newstate;
    saveCharacterData(character, character.id);
  }

  function tglReadMore(index) {
    if (readMore === index) {
      setReadMore(false);
    } else {
      setReadMore(index);
    }
  }

  return (
    <div className="mt-2 grid gap-2 text-sm">
      <div className="flex gap-4 items-center">
        <h4 className="h4-title">Feeatures</h4>
        <select
          onChange={(e) => addFeature(e.target.value)}
          name=""
          id=""
          className="bg-transparent border-white border p-1 rounded"
        >
          {features?.map((feat) => (
            <option key={feat.index} value={feat.url}>
              {feat.index.replaceAll("-", " ")}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap gap-2 border-b border-white pb-2">
        {value?.features?.map((feat, index) => (
          <div
            key={feat.url}
            className="grid gap-2 justify-between cursor-pointer bg-neonyellow/10 border-neonyellow border relative text-sm rounded p-1"
          >
            <div className="flex gap-2 items-start w-max">
              <p className="font-bold" onClick={() => tglReadMore(index)}>
                {feat.index.replaceAll("-", " ")}
                <span className="font-normal">, Level: {feat.level}</span>
              </p>
              <button
                onClick={() => removeFeature(index)}
                className="text-white text-base bg-neonred w-4 h-4 rounded flex justify-center items-center"
              >
                -
              </button>
            </div>
            <p
              onClick={() => tglReadMore(index)}
              className={`${readMore !== index && "hidden"} col-span-3 pt-1`}
            >
              {feat.desc[0]}
              {feat.desc[1] ?? ""}
              {feat.desc[2] ?? ""}
              {feat.desc[3] ?? ""}
              {feat.desc[4] ?? ""}
            </p>
          </div>
        ))}
      </div>
      {/*    <EditorProvider>
        <Editor
          value={value.features}
          onChange={(e) => onChange("features", e)}
        >
          <Toolbar>
            <h4 className="text-base font-almendra font-bold text-black px-4">
              FEATURES
            </h4>
            <BtnRedo />
            <BtnUndo />
            <BtnBold />
            <BtnItalic />
            <BtnStrikeThrough />
            <BtnUnderline />
          </Toolbar>
        </Editor>
      </EditorProvider> */}
      <EditorProvider>
        <Editor value={value.traits} onChange={(e) => onChange("traits", e)}>
          <Toolbar>
            <h4 className="text-base font-almendra font-bold text-black px-4">
              TRAITS
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

export default FeatureAndTraits;
