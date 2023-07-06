import { test, expect } from "@playwright/test";
import { DominosHome } from "../pages/dominosHome";
import { TopologyOpeningEvent } from "mongodb";

test.describe("e2e ordering a pizza!", async () => {
  test("getting started should contain table of contents", async ({ page }) => {
    const dominosPage = new DominosHome(page);
    await dominosPage.goto(); //typically I would put this into a fixture

    await test.step("Ensure url is correct", async () => {
      expect(page).toHaveURL("https://www.dominos.ie/");
      await dominosPage.cookieAccept.click();
    });
    await test.step("Fill in address details", async () => {
      await dominosPage.addressField.fill("R56PT80");
      await page.waitForTimeout(2000);
      await dominosPage.deliveryButton.click();
      await dominosPage.addressText.click();
      await dominosPage.deliverToMe.click();
    });
    await test.step("The price reflects the current pizza size slected", async () => {
      await dominosPage.closeOfferDialogue.click();
      await dominosPage.chooseBtn.click();
      await expect(dominosPage.createYourOwnTile).toContainText(/Create Your Own/);
      await dominosPage.smallPizza.click();
      await expect(dominosPage.totalCost).toHaveText(/€9.99/);
      await dominosPage.mediumPizza.click();
      await expect(dominosPage.totalCost).toHaveText(/€14.50/);
    });

    await test.step("Add stuffed crust", async () => {
      await dominosPage.stuffedCrust.dblclick();
      await expect(dominosPage.totalCost).toHaveText(/€16.50/);
    });
    await test.step("Add toppings", async () => {
      await dominosPage.toppings.click();
      await dominosPage.pepperoni.click();
      await dominosPage.extra.click();
      await expect(dominosPage.totalCost).toHaveText(/€18.70/);
    });

    await test.step("procees to checkout", async () => {
      await dominosPage.baseketIcon.click();
      await expect(dominosPage.basketSummary).toBeVisible();
    });
  });
});
