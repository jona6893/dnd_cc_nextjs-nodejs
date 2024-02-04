import CreateCharacter from "./CreateCharacter";
import CurrentCharacters from "./CurrentCharacters";


function Startscreen() {


  return (
    <section className="w-screen h-screen inset-0 fixed bg-background/50 flex items-center justify-center text-white z-50">
      <div className="bg-overlay w-11/12 h-5/6 rounded-md grid grid-cols-startscreen p-4">
        <div className="border-r border-white">
          <h2 className="text-lg font-almendra">New Character</h2>
          <CreateCharacter />
        </div>
        <div className="col-start-2 flex flex-col gap-2 items-center overflow-auto border-l pl-4 border-white">
          <h2 className="text-lg font-almendra w-full">Characters</h2>
          <CurrentCharacters />
        </div>
      </div>
    </section>
  );
}

export default Startscreen