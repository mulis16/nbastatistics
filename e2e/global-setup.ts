import fs from "fs";
import path from "path";
import { fetchPlayersData } from "./helpers/fetchPlayersData";

async function globalSetup() {
  console.log("Fetching players data in global setup...");

  try {
    const players = await fetchPlayersData();
    if (!players) {
      throw new Error("Players data is null or undefined");
    }

    if (players.length === 0) {
      throw new Error("No players were fetched. The players array is empty");
    }

    console.log(`Successfully fetched ${players.length} players`);

    const dataDir = path.join(__dirname, "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const dataPath = path.join(dataDir, "players.json");
    fs.writeFileSync(dataPath, JSON.stringify(players, null, 2));

    console.log(`Players data saved to ${dataPath}`);
  } catch (error) {
    console.error(`Global setup failed: ${error}`);
    throw error;
  }
}

export default globalSetup;
