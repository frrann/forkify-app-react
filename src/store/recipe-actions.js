import { recipeActions } from "./recipe-slice";
import { uiActions } from "./ui-slice";

export const fetchResults = (query) => {
  return async (dispatch) => {
    const fetchRecipes = async () => {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=2d03b995-6524-4b23-9d21-fab32287b765`
      );

      if (!response.ok) {
        throw new Error("Could not fetch recipes list!");
      }

      const responseData = await response.json();
      return responseData.data.recipes;
    };

    try {
      dispatch(uiActions.setIsLoading(true));
      const recipes = await fetchRecipes();

      dispatch(recipeActions.replaceResults({ recipes: recipes }));
    } catch (error) {
      dispatch(uiActions.setError(error.message));
    }
    dispatch(uiActions.setIsLoading(false));
  };
};
