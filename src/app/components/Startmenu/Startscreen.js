import { deleteSession } from "@/app/sessionActions/deleteSession";
import CreateCharacter from "./CreateCharacter";
import CurrentCharacters from "./CurrentCharacters";
import { useEffect, useState } from "react";
import { checkSession } from "@/app/sessionActions/checkSession";
import DeletePrompt from "../ui_components/modals/DeletePrompt";

function Startscreen() {
  const [userInfo, setUserInfo] = useState({});

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

  const WelcomeMSG = ({ value }) => {
    if (value == "username") {
      return (
        <div>
          <h4 className="text-gray-300">
            Welcome:{" "}
            <span className="text-neonpurple-500">{userInfo?.username}</span>
          </h4>
        </div>
      );
    }
    if (value == "logout") {
      return (
        <div className="flex">
          <button
            className="text-neonpurple-500 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      );
    }
  };

  return (
    <section className="w-screen h-screen inset-0 fixed md:bg-background/50 max-md:bg-overlay flex items-center overflow-auto justify-center text-white z-50">
      <div className="relative md:w-10/12 md:h-5/6 max-md:w-full max-md:h-full grid md:grid-cols-2 gap-4 bg-overlay p-4">
        <div className="max-md:order-1">
          <h2 className="text-lg font-almendra">New Character</h2>

          <div className="max-md:hidden">
            <WelcomeMSG value={"username"} />
          </div>
          <div className="md:hidden">
            <WelcomeMSG value={"logout"} />
          </div>
          <CreateCharacter userInfo={userInfo} />
        </div>
        <div className="">
          <h2 className="text-lg font-almendra w-full">Characters</h2>
          <div className="max-md:hidden">
            <WelcomeMSG value={"logout"} />
          </div>
          <div className="md:hidden">
            <WelcomeMSG value={"username"} />
          </div>
          <CurrentCharacters
            userInfo={userInfo}
          />
        </div>
        
      </div>
    </section>
  );
}

export default Startscreen;
