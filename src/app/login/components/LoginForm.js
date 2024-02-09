"use client";
import { useState } from "react";
import { loginAccount } from "@/app/actions/loginAccount";
import { loginUser } from "@/app/modules/apiCalls";

function LoginForm() {
  const [feedback, setFeedback] = useState("");
  function checkWhitespace(str) {
    return /\s/.test(str);
  }
  function containsUppercase(str) {
    return /^(?=.*[A-Z]).*$/.test(str);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

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

     setFeedback(loginUser(credentials))
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-3/4 h-fit bg-overlay rounded-md flex gap-4 flex-col items-center justify-center text-white p-2 py-12"
    >
      <h1 className="text-xl ">Login</h1>
      <p className="text-red-500">{feedback}</p>
      <label htmlFor="" className="w-full max-w-md flex flex-col gap-2">
        <span className="text-gray-300">Username</span>
        <input
          className="max-w-md w-full bg-transparent border-2 p-2 rounded-md"
          type="text"
          name="username"
          id="username"
          required
        />
      </label>
      <label htmlFor="" className="w-full max-w-md flex flex-col gap-2">
        <span className="text-gray-300">Password</span>
        <input
          className="max-w-md w-full bg-transparent border-2 p-2 rounded-md"
          type="password"
          name="password"
          id="password"
          required
        />
      </label>
      <div className="flex flex-col gap-4 justify-between w-full max-w-md">
        <button
          type="submit"
          className="font-almendra text-md bg-neonpurple-400 hover:bg-neonpurple-500 px-6 py-1 rounded"
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
