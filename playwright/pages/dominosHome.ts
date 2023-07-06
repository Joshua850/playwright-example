import { Locator, Page } from "@playwright/test";

export class DominosHome {
  readonly cookieAccept: Locator;
  readonly addressField: Locator;
  readonly baseUrl: string;
  readonly page: Page;
  readonly deliveryButton: Locator;
  readonly addressSection: Locator;
  readonly addressText: Locator;
  readonly createYourOwnTile: Locator;
  readonly chooseBtn: Locator;
  readonly title: Locator;
  readonly smallPizza: Locator;
  readonly mediumPizza: Locator;
  readonly totalCost: Locator;
  readonly pizzaPrice: Locator;
  readonly crustBlock: Locator;
  readonly stuffedCrust: Locator;
  readonly toppings: Locator;
  readonly pepperoni: Locator;
  readonly baseketIcon: Locator;
  readonly closeOfferDialogue: Locator;
  readonly deliverToMe: Locator;
  readonly extra:Locator;
  readonly basketSummary:Locator

  constructor(page: Page) {
    this.page = page;
    this.baseUrl = "https://www.dominos.ie";
    this.cookieAccept = this.page.locator("#onetrust-accept-btn-handler");
    this.deliveryButton = this.page.getByRole("button", { name: "Delivery" });
    this.addressField = this.page.getByRole("textbox");
    this.addressSection = this.page.locator(".base-select-extended__dropdown");
    this.deliverToMe = this.page.getByRole("button", { name: "deliver to me" });
    this.closeOfferDialogue = this.page.getByRole("button", { name: "close" });
    this.addressText = this.page.getByText("Market Square Apartment 9, MAIN STREET, Kilcullen, R56 PT80").nth(1);
    this.createYourOwnTile = this.page.getByRole("heading", { name: "create your own" }).first();
    this.totalCost = this.page.locator(".base-sub-heading__price-value").first();
    this.chooseBtn = this.page.getByText("Choose").first();
    this.title = this.page.locator("#pizza-name").first();
    this.smallPizza = this.page.getByText("Small 9.5").first();
    this.mediumPizza = this.page.getByText("Medium 11.5");
    this.pizzaPrice = this.page.locator("#pizza-price");
    this.crustBlock = this.page.getByRole("group",{name:"crust"});
    this.stuffedCrust = this.page.locator('label').filter({ hasText: 'Domino\'s Stuffed Crust® Delicious mozzarella cheese with a hint of garlic & herb' })
    this.toppings = this.page.getByRole("tab", { name: "toppings" });
    this.pepperoni = this.page.locator('label').filter({ hasText: 'Pepperoni' }).first();
    this.extra=this.page.getByText('Extra Pepperoni?');
    this.baseketIcon = this.page.locator(".base-data-button__container").nth(1);
    this.basketSummary=this.page.locator(".base-ribbon-title__text").first();
  }
  async goto() {
    await this.page.goto(this.baseUrl);
  }
}
