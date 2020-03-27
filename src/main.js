import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import { MealDB } from "./../src/meal-db.js";

$(document).ready(function() {
  function renderResults(response, showDetails = false) {
    if (response) {
      const results = [];
      for (let i = 0; i < response.meals.length; i++) {
        // console.log(i);
        const meal = response.meals[i];
        const output = $("<div>").addClass("output1");

        const row = $("<div>")
          .addClass("row")
          .appendTo(output);
        const imgCol = $("<div>")
          .addClass("col-md-6 img")
          .appendTo(row);

        $("<div>")
          .addClass("meal-name")
          .text(meal.strMeal)
          .data("mealDetails", meal)
          .appendTo(imgCol);
        $("<img>")
          .addClass("meal-img")
          .attr("src", meal.strMealThumb)
          .appendTo(imgCol);

        if (showDetails) {
          const IngCol = $("<div>")
            .addClass("col-md-6")
            .appendTo(row);
          const ingredients = $("<div>")
            .addClass("ingredients")
            .append($("<strong>").text("Ingredients"))
            .appendTo(IngCol);

          const listContainer = $("<ul>").appendTo(ingredients);
          for (let i = 1; i <= 20; i++) {
            const strIngredient = meal[`strIngredient${i}`];
            const strMeasure = meal[`strMeasure${i}`];
            if (strIngredient && strMeasure) {
              $("<li>")
                .text(`${strMeasure} ${strIngredient}`)
                .appendTo(listContainer);
            }
          }

          const instructions = $("<div>")
            .addClass("instruction")
            .text("Instructions")
            .appendTo(output);

          $("<div>")
            .addClass("instr")
            .text(meal.strInstructions)
            .appendTo(instructions);
        }

        results.push(output);
      }
      $(".output")
        .empty()
        .append(results);
    } else {
      $(".output").text(
        `There was an error handling your request. Please check your inputs and try again!`
      );
    }
  }

  $(".output").on("click", ".meal-name", ev => {
    const target = $(ev.target);
    const data = {
      meals: [target.data("mealDetails")]
    };
    renderResults(data, true);
  });

  $("#recipe").click(function() {
    const name = $("#name").val();
    $("#name").val("");

    (async () => {
      const mealRecipe = new MealDB();
      const response = await mealRecipe.getRecipe(name);
      renderResults(response);
    })();
  });
});
