"use server";
import { cookies } from "next/headers";

export const getRememberUser = async () => {
  const cookieStore = cookies();
  return !!cookieStore.get("remember")?.value;
};
