import axios from "axios";
import { Player } from "../interfaces/player.interface";
const API_KEY = "58957574730c4ee1b809da2f53525997";
const API_URL = `https://api.sportsdata.io/v3/nba/scores/json/Players/DAL?key=${API_KEY}`;

/**
 * Fetches active NBA players data from the API
 * @returns Array of active players
 */

export async function fetchPlayersData() {
  try {
    const response = await axios.get(API_URL);
    if (!response.data) {
      throw new Error("No data received from API");
    }
    return response.data.filter((player: Player) => player.Status === "Active");
  } catch (error) {
    console.error("Failed to fetch players.", error);
    throw error;
  }
}
