import { deleteSession } from "@/app/actions/deleteSession";
import CreateCharacter from "./CreateCharacter";
import CurrentCharacters from "./CurrentCharacters";
import { useEffect, useState } from "react";
import { checkSession } from "@/app/actions/checkSession";

function Startscreen() {
  const [userInfo, setUserInfo] = useState({})  

  function handleLogout() {
    deleteSession();
  }
  // get the logged in users id and username
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await checkSession();
        setUserInfo(JSON.parse(result.value));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="w-screen h-screen inset-0 fixed bg-background/50 flex items-center justify-center text-white z-50">
      <div className="bg-overlay w-11/12 h-5/6 rounded-md grid grid-cols-startscreen p-4">
        <div className="border-r border-white">
          <h2 className="text-lg font-almendra">New Character</h2>
          <h4>{userInfo?.username}</h4>
          <CreateCharacter
            userInfo={userInfo}
        
          />
        </div>
        <div className="col-start-2 flex flex-col gap-2 items-center overflow-auto border-l pl-4 border-white">
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-almendra w-full">Characters</h2>
            <button
              className="text-neonpurple-500 cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          <CurrentCharacters userInfo={userInfo} />
        </div>
      </div>
    </section>
  );
}

export default Startscreen;
