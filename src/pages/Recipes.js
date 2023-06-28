import { Outlet } from "react-router-dom";

import { recipes } from "../data/recipes-data";

import RecipesList from "../components/recipes/RecipesList";

const RecipesPage = () => {
  return (
    <>
      <RecipesList recipes={recipes} />
      <div style={{ gridArea: "recipe", backgroundColor: "#f9f5f3" }}>
        <Outlet />
      </div>
    </>
  );
};

export default RecipesPage;
