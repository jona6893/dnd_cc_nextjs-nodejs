"use server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const deleteSession = () => {
  const token = cookies().delete("dnd-token");
  const user = cookies().delete("user");

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
