"use client";
import { loginAccount } from "@/app/actions/loginAccount";
import { signUpNewUser } from "@/app/modules/apiCalls";
import { epochToUtcDateTime } from "@/app/modules/getCurrentDate";
import { useState } from "react";

function SignupForm() {
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
    const passwordRetype = event.target.passwordRetype.value;

    if (password !== passwordRetype) {
      //console.log("passwords dont match");
      setFeedback("Passwords Dont Match");
      return;
    }
    if (username.length < 4) {
      //console.log("username not long enough, alest 4 characters");
      setFeedback("Username is not long enough, at least 4 characters");
      return;
    }
    if (checkWhitespace(username)) {
      //console.log("username has whitespace");
      setFeedback("Username Has Whitespace");
      return;
    }
    if (containsUppercase(username)) {
      //console.log("username cannot have capital letters");
      setFeedback("Username cannot have capital letters");
      return;
    }
    const newUser = { username, password, created_by: epochToUtcDateTime() };
    signUpNewUser(newUser);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-3/4 h-fit bg-overlay rounded-md flex gap-4 flex-col items-center justify-center text-white p-2 py-12"
    >
      <h1 className="text-xl ">Sign Up</h1>
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
      <label htmlFor="" className="w-full max-w-md flex flex-col gap-2">
        <span className="text-gray-300">Re-type Password</span>
        <input
          className="max-w-md w-full bg-transparent border-2 p-2 rounded-md"
          type="password"
          name="passwordRetype"
          id="passwordRetype"
          required
        />
      </label>
      <div className="flex flex-col gap-4 justify-between w-full max-w-md">
        <button
          type="submit"
          className="font-almendra text-md bg-neonpurple-400 hover:bg-neonpurple-500 px-6 py-1 rounded"
        >
          Sign Up
        </button>
        <a href="/login">
          Already signed up?{" "}
          <span className="text-neonpurple-500">Click here to Login!</span>
        </a>
      </div>
    </form>
  );
}

export default SignupForm;
