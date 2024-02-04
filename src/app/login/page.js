"use client"
import React from 'react'

function Login() {

      async function connectToAPI() {
        const apiUrl = "http://62.198.182.210:8081/api/login";
        const apiKey = "myapikey";

        try {
          const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "api-key": apiKey,
            },
            body: JSON.stringify({username:"mrmackey", password:"007bigcoke"})
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Data received:", data);
          return data;
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      }

      connectToAPI();

  return (
    <div>Login</div>
  )
}

export default Login