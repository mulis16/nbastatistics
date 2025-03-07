import { expect, Locator, Page } from "@playwright/test";

export class NbaPlayersPage {
  private readonly page: Page;
  private readonly url = "https://www.nba.com/players";

  public readonly leagueRosterHeading: Locator;
  public readonly cookieButton: Locator;
  public readonly playersListTable: Locator;
  public readonly searchInput: Locator;
  public readonly teamDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = this.page.getByPlaceholder("Search Players", {
      exact: true,
    });
    this.teamDropdown = this.page.getByTitle("team name drop down list");
    this.leagueRosterHeading = this.page.getByRole("heading", {
      name: "League Roster",
    });
    this.cookieButton = this.page.getByRole("button", { name: "Accept" });
    this.playersListTable = this.page.locator(".players-list");
  }

  async navigate() {
    await this.page.goto(this.url, { waitUntil: "domcontentloaded" });
  }

  async assertFieldsVisility() {
    await expect(this.leagueRosterHeading).toBeVisible();
    await expect(this.playersListTable).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.teamDropdown).toBeVisible();
  }

  async searchPlayer(playerName: string) {
    await this.searchInput.fill(playerName);
    await this.page.keyboard.press("Enter");
  }

  async checkPlayerNameToMatchWebsite(playerName: string) {
    // Dante Exum's name is spelled differently on the website than in the data file
    // and needs to be adjusted since on the website Dante Exum is not found
    if (playerName === "Dante Exum") {
      playerName = "Danté Exum";
    }
    return playerName;
  }

  async clickPlayerLink(playerName: string) {
    await this.page.getByRole("link", { name: playerName }).click();
  }
}
