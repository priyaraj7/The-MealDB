export class MealDB {
  async getRecipe(name) {
    try {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

      let response = await fetch(url, {});

      let jsonifiedResponse;
      if (response.ok && response.status == 200) {
        jsonifiedResponse = await response.json();

        console.log(jsonifiedResponse);
      } else {
        jsonifiedResponse = false;
      }
      return jsonifiedResponse;
    } catch (e) {
      return false;
    }
  }
}
