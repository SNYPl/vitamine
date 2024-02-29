"use server";
import axios from "axios";

export const createUser = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.API_REQUEST_URL}/api/auth/signup`,
      { ...data }
    );

    const dataResp = response.data;

    return dataResp;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
};
