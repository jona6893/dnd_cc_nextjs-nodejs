

function ManageActions({ popup, setPopup, actions, setAction, character }) {
  //console.log(actions);
  return (
    <div>
      ManageActions
      <button
        onClick={() => {
          setPopup(!popup);
        }}
      >
        X
      </button>
      <section>
       
      </section>
    </div>
  );
}

export default ManageActions