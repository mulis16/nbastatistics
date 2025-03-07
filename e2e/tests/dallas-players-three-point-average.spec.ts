import { test, expect } from "@playwright/test";
import { Player } from "../interfaces/player.interface";
import { NbaPlayersPage } from "../pages/nba-players.page";
import { PlayerDetailsPage } from "../pages/player-details.page";
import fs from "fs";
import path from "path";

const dataPath = path.join(__dirname, "./../data/players.json");
let players: Player[] = [];
let playersLoaded = false;

try {
  if (fs.existsSync(dataPath)) {
    players = JSON.parse(fs.readFileSync(dataPath, "utf8"));
    if (players && players.length > 0) {
      playersLoaded = true;
    } else {
      throw new Error("Players data file exists but contains no players");
    }
  } else {
    throw new Error("Players data file does not exist");
  }
} catch (error) {
  console.error(`Failed to load players data: ${error}`);
}

for (const player of players) {
  const { FirstName, LastName } = player;
  const playerFullName = `${FirstName} ${LastName}`;

  test(`Verify 3-point average for ${playerFullName}`, async ({ page }) => {
    const nbaPlayersPage = new NbaPlayersPage(page);
    const playerDetailsPage = new PlayerDetailsPage(page);

    const displayName = await nbaPlayersPage.checkPlayerNameToMatchWebsite(
      playerFullName
    );

    await nbaPlayersPage.navigate();
    await nbaPlayersPage.assertFieldsVisility();

    await nbaPlayersPage.searchPlayer(displayName);
    await nbaPlayersPage.clickPlayerLink(displayName);
    await playerDetailsPage.verifyPlayerName(displayName);

    await playerDetailsPage.waitForStats();
    const average = await playerDetailsPage.getThreePointersAverage();

    await expect(
      average,
      `${displayName}'s 3-point average for the last 5 games is (${average}) should be greater than or equal to 1`
    ).toBeGreaterThanOrEqual(1);
  });
}
