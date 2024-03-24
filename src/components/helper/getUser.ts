"use server";

import { getCurrentUser } from "./session";

export const getUser = async () => {
  const user = await getCurrentUser();

  const requestData = user?.email;

  const response = await fetch(
    `${process.env.API_REQUEST_URL}/api/user?email=${requestData}`,
    {
      next: { tags: ["user"] },
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
};
