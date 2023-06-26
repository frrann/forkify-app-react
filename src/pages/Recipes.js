import { Outlet } from "react-router-dom";

import { recipes } from "../data/recipes-data";

import RecipesList from "../components/recipes/RecipesList";

const RecipesPage = () => {
  return (
    <>
      <RecipesList recipes={recipes} />
      <Outlet />
    </>
  );
};

export default RecipesPage;
