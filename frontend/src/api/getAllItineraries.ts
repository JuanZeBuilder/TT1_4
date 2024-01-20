import { Itinerary } from "../model/Itinerary";

export const getAllItineraries = async (
  userId: number,
  webToken: string
): Promise<Itinerary[]> => {
  try {
    const backendURL = "http://localhost:8080/";
    const response = await fetch(backendURL + "api/itinerary/" + userId, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + webToken
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
