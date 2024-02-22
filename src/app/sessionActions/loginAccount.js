"use server";

import { randomBytes } from "crypto";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const loginAccount = (userData) => {
  console.log(userData);
  const username = userData.username;
  const id = userData.id;
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  const secureToken = randomBytes(16).toString("hex");

  const userInfo = {
    id: id,
    username: username,
  };

  // Encode the user information as a JSON string
  const userInfoString = JSON.stringify(userInfo);

  cookies().set("dnd-token", secureToken, {
    expires: expirationDate,
  });
  cookies().set("user", userInfoString, {
    expires: expirationDate,
  });

  redirect("/");
};
