import { json } from "react-router-dom";

import RecipeDetails from "../components/recipes/RecipeItemDetails";

const RecipeDetailsPage = () => {
  return <RecipeDetails />;
};

export default RecipeDetailsPage;

export const recipeLoader = async ({ request, params }) => {
  const { id } = params;
  const response = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );

  if (!response.ok) {
    return json("Could not fetch recipe details!", { status: 500 });
  } else {
    const responseData = await response.json();
    return responseData;
  }
};
