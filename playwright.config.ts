import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./e2e/tests",
  timeout: 35000,
  expect: {
    timeout: 5000,
  },
  use: {
    browserName: "chromium",
    headless: true,
    viewport: { width: 1280, height: 720 },
    video: "retain-on-failure",
    screenshot: "on",
    trace: "retain-on-failure",
  },
  reporter: [["list"], ["html", { open: "never" }]],
  retries: 0,
  workers: 3,
  fullyParallel: true,
  globalSetup: "./e2e/global-setup.ts",
};

export default config;
