
function OnScreenMenu({ tglMenus, setTglMenus }) {
  function tgl(item) {
    let newState = { ...tglMenus };
    newState[item] = !newState[item];
    setTglMenus(newState);
  }
  console.log(tglMenus);
  return (
    <div className="fixed bottom-0 left-0 right-0 mx-auto px-2 h-[50px] w-fit bg-black/25 flex gap-4 justify-center mr-0 items-center justify-items-center">
      <button
        onClick={() => tgl("skills")}
        className={`flex justify-center items-center ${tglMenus.skills ? 'bg-neongreen':'bg-neonred'} rounded w-fit h-6 px-2`}
      >
        Skills
      </button>

      <button
        onClick={() => tgl("stats")}
        className={` flex justify-center items-center ${tglMenus.stats ? 'bg-neongreen':'bg-neonred'} rounded w-fit h-6 px-2`}
      >
        Stats
      </button>
      <button
        onClick={() => tgl("actionSpells")}
        className={` flex justify-center items-center ${tglMenus.actionSpells ? 'bg-neongreen':'bg-neonred'} rounded w-fit h-6 px-2`}
      >
        Actions/Equipment
      </button>
    </div>
  );
}

export default OnScreenMenu;
