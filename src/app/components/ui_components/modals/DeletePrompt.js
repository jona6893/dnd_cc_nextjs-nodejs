import React from "react";

function DeletePrompt({ modal, setModal, deleteFunction }) {
    //Accepts a state for opening and closing the modal window. 3 Argument is a function the deletes the character
    //The modal most be an object with 2 keys, a "value"=true/false and a "_id" = "" the id of the character to delete.


    // close modal on escape key
     const handleKeyDown = (event) => {
       if (event.key === "Escape") {
         document.removeEventListener("keydown", handleKeyDown);
         let newState = { ...modal };
         newState.value = !modal.value;
         setModal(newState);
       }
     };

     if (modal.value === true) {
       document.addEventListener("keydown", handleKeyDown);
     }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 grid gap-4 m-auto w-fit h-fit bg-black p-4 rounded-md">
      <h4>Are sure you want to DELETE this character?</h4>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            deleteFunction(modal._id);
            let newState = { ...modal };
            newState.value = !modal.value;
            newState._id = "";
            setModal(newState);
          }}
          className="green-button"
        >
          Yes
        </button>
        <button
          onClick={() => {
            let newState = { ...modal };
            newState.value = !modal.value;
            setModal(newState);
          }}
          className="red-button"
        >
          No
        </button>
      </div>
    </div>
  );
}

export default DeletePrompt;
