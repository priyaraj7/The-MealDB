import { MealDB } from "../src/meal-db";
import fetchMock from "fetch-mock";

describe("MealDB", () => {
  it("getReceipe", async () => {
    const query = "paneer";
    const expectedResponse = {
      meals: {}
    };

    fetchMock.get(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
      JSON.stringify(expectedResponse)
    );
    const mealRecipe = new MealDB();

    const response = await mealRecipe.getRecipe(query);

    expect(response).toEqual(expectedResponse);
  });
});
