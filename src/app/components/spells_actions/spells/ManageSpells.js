import { useEffect, useState } from 'react'
import SearchSpells from './SearchSpells';
import PreviewSpell from './PreviewSpell';
import KnownSpells from './KnownSpells';
import FormSpell from './FormSpell';
import PreparedSpells from './PreparedSpells';

function ManageSpells({
  popup,
  setPopup,
  character,
  updateSpells,
  spells,
  setSpells,
  consolelog,
}) {
  const [previewSpell, setPreviewSpell] = useState([]);
  const [formSpell, setFormSpell] = useState(false);

  useEffect(() => {
    const handlePopupClick = (e) => {
      // Check if the click was directly on the popupContainer
      if (e.target === e.currentTarget) {
        setPopup(!popup);
      }
    };
    const popupContainer = document.getElementById("popupContainer");

    // Add event listener
    popupContainer.addEventListener("click", handlePopupClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      popupContainer.removeEventListener("click", handlePopupClick);
    };
  }, [popup]);

  return (
    <div className="w-full h-full">
      <h2 className="h2-title">Manage Spells</h2>
      <button
        className="absolute top-4 right-6 text-white"
        onClick={() => {
          setPopup(!popup);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <section className="grid sm:grid-cols-2 gap-4 w-full h-full">
        <div className="flex flex-col gap-2">
          <div className="w-full min-h-[100px]">
            <h4 className="w-full h4-title font-semibold border-b border-white">
              Prepared Spells
            </h4>
            <PreparedSpells
              spells={spells}
              setSpells={setSpells}
              setPreviewSpell={setPreviewSpell}
              character={character}
            />
          </div>
          <div className="w-full pb-4">
            <h4 className="w-full h4-title font-semibold border-b border-white">
              Known Spells
            </h4>
            <KnownSpells
              spells={spells}
              setSpells={setSpells}
              setPreviewSpell={setPreviewSpell}
              character={character}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-4 w-full border-b border-white">
              <h4 className="h4-title font-semibold w-fit whitespace-nowrap">
                Add Spells
              </h4>
              <SearchSpells
                popup={popup}
                setPreviewSpell={setPreviewSpell}
                updateSpells={updateSpells}
                setSpells={setSpells}
              />
            </div>
            <FormSpell setFormSpell={setFormSpell} formSpell={formSpell} />
          </div>

          <div className="w-full pb-4">
            <h4 className="w-full h4-title font-semibold border-b border-white">
              {previewSpell?.name ? previewSpell.name : "Preview"}
            </h4>
            <PreviewSpell previewSpell={previewSpell} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default ManageSpells