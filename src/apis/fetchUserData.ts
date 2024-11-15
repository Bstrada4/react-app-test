// fetchUserData.ts

import { UserData } from "../interfaces/userData";

const API_USER = process.env.REACT_APP_API_USER;

export const fetchUserData = async (): Promise<UserData> => {
    const response = await fetch(API_USER!);
    
    if (!response.ok) {
      throw new Error("Error fetching user data");
    }
  
    const data: UserData = await response.json();
    return data;
};
  