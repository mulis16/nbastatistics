import fs from "fs";
import path from "path";
import { fetchPlayersData } from "./helpers/fetchPlayersData";

async function globalSetup() {
  console.log("Fetching players data in global setup...");

  // Fetch player data
  const players = await fetchPlayersData();

  // Ensure directory exists
  const dataDir = path.join(__dirname, "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Save data to file
  const dataPath = path.join(dataDir, "players.json");
  fs.writeFileSync(dataPath, JSON.stringify(players, null, 2));

  console.log(`Players data saved to ${dataPath}`);
}

export default globalSetup;
