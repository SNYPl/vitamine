import User from "@/models/user";
import { getCurrentUser } from "./session";
import { revalidatePath } from "next/cache";
import axios from "axios";

export const getUser = async () => {
  const user = await getCurrentUser();

  const requestData = user?.email;

  // Make the request using Axios
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

  revalidatePath("/");

  const data = await response.json();

  return data;
};
