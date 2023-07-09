import { recipeActions } from "./recipe-slice";
import { uiActions } from "./ui-slice";

export const fetchResults = (query) => {
  return async (dispatch) => {
    dispatch(uiActions.setIsLoading(true));

    const fetchRecipes = async () => {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=0a5b5dab-cd85-4d6f-95c5-b897efe52237`
      );

      if (!response.ok) {
        throw new Error("Could not fetch recipes list!");
      }

      const responseData = await response.json();
      return responseData.data.recipes;
    };

    try {
      const recipes = await fetchRecipes();
      dispatch(recipeActions.replaceResults({ recipes: recipes }));
    } catch (error) {
      dispatch(
        uiActions.setNotification({ status: "error", message: error.message })
      );
    }
    dispatch(uiActions.setIsLoading(false));
  };
};

export const sendData = (data) => {
  return async (dispatch) => {
    dispatch(uiActions.setIsLoading(true));

    const sendRequest = async () => {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/?key=0a5b5dab-cd85-4d6f-95c5-b897efe52237`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Uploading recipe failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.setNotification({
          status: "success",
          message: "Recipe was successfully uploaded :)",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.setNotification({ status: "error", message: error.message })
      );
    }
    dispatch(uiActions.setIsLoading(false));
  };
};

export const getRecipe = (id, bookmarks) => {
  return async (dispatch) => {
    dispatch(uiActions.setIsLoading(true));

    const fetchRecipe = async () => {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch recipe!");
      }

      const responseData = await response.json();

      const data = responseData.data.recipe;
      const recipe = { ...data, bookmarked: false };

      if (bookmarks.find((bookmark) => bookmark.id === recipe.id)) {
        recipe.bookmarked = true;
      }

      return recipe;
    };

    try {
      const recipe = await fetchRecipe();
      dispatch(recipeActions.loadRecipe(recipe));
    } catch (error) {
      dispatch(
        uiActions.setNotification({ status: "error", message: error.message })
      );
    }
    dispatch(uiActions.setIsLoading(false));
  };
};
