"use server";

import { randomBytes } from "crypto";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const checkSession = () => {
  const token = cookies().get("dnd-token");
  const user = cookies().get("user");

  if (token && user) {
    // Cookie 'token' exists, user is likely authenticated
    //console.log(user);
    return user;
  } else {
    // Cookie 'token' does not exist, user is not authenticated
    //console.log("is not there");
    redirect("/login");
  }
};
