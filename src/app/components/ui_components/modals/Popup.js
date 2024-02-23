import { useEffect } from "react";


function Popup({children, state, setState}) {




  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      document.removeEventListener("keydown", handleKeyDown);
      setState(!state)
    }
  };

  if(state === true){
    document.addEventListener("keydown", handleKeyDown);
  }
  

  return (
    <div
      id="popupContainer"
      className="bg-black/50 w-screen h-screen inset-0 flex justify-center items-center fixed z-50"
    >
      <div
        id="popupContent"
        className="sm:w-11/12 max-sm:w-full sm:h-5/6 max-sm:h-full bg-overlay rounded-md p-4 max-sm:p-2 relative overflow-auto"
      >
        {children}
      </div>
    </div>
  );
}

export default Popup