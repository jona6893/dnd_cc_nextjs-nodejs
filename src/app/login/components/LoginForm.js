"use client";
import { useState } from "react";
import { loginAccount } from "@/app/sessionActions/loginAccount";
import { loginUser } from "@/app/modules/apiCalls";
import { Input } from "@nextui-org/react";

function LoginForm() {
  const [usernameSlct, setUsernameSlct] = useState(null);
  const [passwordSlct, setPasswordSlct] = useState(null);
  const [feedback, setFeedback] = useState("");
  function checkWhitespace(str) {
    return /\s/.test(str);
  }
  function containsUppercase(str) {
    return /^(?=.*[A-Z]).*$/.test(str);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const username = usernameSlct;
    const password = passwordSlct;

    if (username.length < 4) {
      //console.log("username not long enough");
      return;
    }
    if (checkWhitespace(username)) {
      //console.log("username has whitespace");
      return;
    }
    if (containsUppercase(username)) {
      //console.log("username has capital letters");
      return;
    }
    const credentials = { username, password };

    const apiUrl = "http://62.198.182.210:8081/api/login";
    const apiKey = "myapikey";

    console.log(credentials);
    setFeedback(loginUser(credentials));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-3/4 h-fit bg-overlay rounded-md flex gap-4 flex-col items-center justify-center text-white p-2 py-12"
    >
      <h1 className="text-xl ">Login</h1>
      <p className="text-red-500">{feedback}</p>
      <label htmlFor="" className="w-full max-w-md flex flex-col gap-2">
        <Input
          isRequired
          type="text"
          label="Enter Username"
          className="dark"
          placeholder="Enter Username"
          onValueChange={setUsernameSlct}
        />
      </label>
      <label htmlFor="" className="w-full max-w-md flex flex-col gap-2">
        <Input
          isRequired
          type="password"
          label="Enter Password"
          className="dark"
          placeholder="Enter Password"
          onValueChange={setPasswordSlct}
        />
      </label>
      <div className="flex flex-col gap-4 justify-between w-full max-w-md">
        <button
          type="submit"
          className="font-almendra text-md bg-neonpurple-400 hover:bg-neonpurple-500 px-6 py-2 rounded-lg"
        >
          Login
        </button>
        <a href="/signup">
          Not signed up?{" "}
          <span className="text-neonpurple-500">Click here to Sign up!</span>
        </a>
      </div>
    </form>
  );
}

export default LoginForm;
