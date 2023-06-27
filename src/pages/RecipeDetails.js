import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { actions } from "../store";
import { recipes } from "../data/recipes-data";

import RecipeDetails from "../components/recipes/RecipeItemDetails";

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const crtRecipe = recipes.filter((recipe) => recipe.id === id)[0]
      .recipeDetails;
    console.log(crtRecipe);
    dispatch(actions.setRecipe(crtRecipe));
  }, [dispatch, id]);

  return <RecipeDetails />;
};

export default RecipeDetailsPage;
