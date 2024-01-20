import { User } from "../model/User"

export type LoginResponse = {
    status: string,
    user: User[],
    jwt_token: string
}


export const doLogin = async (username: string, password: string):Promise<LoginResponse | null> => {
  try {
    const backendURL = "http://localhost:8080/";
    const response = await fetch(backendURL + "api/user/login", {
      method: "POST", // Assuming you are using POST for login
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

    const data = response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
