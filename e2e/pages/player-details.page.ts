import { expect, Locator, Page } from "@playwright/test";

export class PlayerDetailsPage {
  private readonly page: Page;
  private readonly statsTable: Locator;
  private readonly tableHeaderCells: Locator;
  private readonly lastFiveGamesHeading: Locator;

  // cache the column index
  private static threePointersColumnIndex: number | null = null;

  constructor(page: Page) {
    this.page = page;
    this.statsTable = this.page.locator("table");
    this.tableHeaderCells = this.page.locator("table thead tr th");
    this.lastFiveGamesHeading = this.page.getByRole("heading", {
      name: "Last 5 Games",
    });
  }

  private getColumnCells(columnIndex: number) {
    return this.page.locator(`table tbody tr td:nth-child(${columnIndex})`);
  }

  async waitForStats() {
    await expect(this.lastFiveGamesHeading).toBeVisible();
    await expect(this.statsTable).toBeVisible();
  }

  async verifyPlayerName(playerName: string) {
    await expect(this.page.locator("h1")).toContainText(playerName);
  }

  async getThreePointersAverage() {
    if (PlayerDetailsPage.threePointersColumnIndex === null) {
      const headers = await this.tableHeaderCells.allTextContents();
      PlayerDetailsPage.threePointersColumnIndex =
        headers.findIndex((header) => header.trim() === "3PM") + 1; // +1 for nth-child
    }

    const threePMValues = await this.getColumnCells(
      PlayerDetailsPage.threePointersColumnIndex
    )
      .allTextContents()
      .then((values) => values.map(Number));

    const totalPoints = threePMValues.reduce(
      (runningTotal, currentValue) => runningTotal + currentValue,
      0
    );
    const numberOfGames = threePMValues.length;

    return totalPoints / numberOfGames;
  }
}
