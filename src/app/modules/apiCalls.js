import { loginAccount } from "../actions/loginAccount";
import { process } from "react-dom/server";

const apiUrl = `http://${process.env.NEXT_PUBLIC_DB_HOST}`;
const apiKey = process.env.NEXT_PUBLIC_DB_API_KEY;

// get all character from DB
export async function getUserCharacters(userInfo) {
  try {
    const response = await fetch(apiUrl + "get-characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({ userId: userInfo.id }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return false;
  }
}
// Create character submit to DB
export async function createCharacters(characterData) {
  try {
    const response = await fetch(apiUrl + "create-character", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(characterData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return false;
  }
}

// Delete A Character From the DB
export async function deleteCharacter(_id) {
  try {
    const response = await fetch(apiUrl + "delete-character", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({ _id: _id }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return false;
  }
}

// Update Character in the DB
export async function updateCharacterDB(update) {
  try {
    const response = await fetch(apiUrl + "update-character", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(update),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data received:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return false;
  }
}

export async function signUpNewUser(newUser) {
  try {
    const response = await fetch(apiUrl + "signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data received:", data);
    loginAccount(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return false;
  }
}
export async function loginUser(credentials) {
  try {
    const response = await fetch(apiUrl + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data received:", data);
    loginAccount(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Invaild Username or Password";
  }
}
