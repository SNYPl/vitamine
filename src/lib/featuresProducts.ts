"use server";

export const getFeaturesProducts = async () => {
  try {
    const response = await fetch(
      `${process.env.API_REQUEST_URL}/api/featuredProducts/get`,
      {
        next: { tags: ["featureProducts"], revalidate: 14400 },
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching wishlist data:", error);
    throw error;
  }
};
