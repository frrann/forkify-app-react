import { json } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouteLoaderData } from "react-router-dom";

import { actions } from "../store";

import RecipeDetails from "../components/recipes/RecipeItemDetails";

const RecipeDetailsPage = () => {
  const { data } = useRouteLoaderData("recipe-details");
  const fetchedRecipe = data.recipe;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setRecipe(fetchedRecipe));
  }, [dispatch, fetchedRecipe]);

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
