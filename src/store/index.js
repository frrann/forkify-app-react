import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipe: {},
  bookmarks: [],
  search: {
    query: "",
    results: [],
  },
};

const slice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipe(state, action) {
      state.recipe = action.payload;
    },
    updateServings(state, action) {
      const serv = action.payload;
      const crtServings = state.recipe.servings;
      const newServings = crtServings + serv;

      if (newServings < 1) {
        return;
      }

      state.recipe.servings = newServings;
      state.recipe.ingredients.forEach((ingr) => {
        ingr.quantity = (ingr.quantity * newServings) / crtServings;
      });
    },
    searchResults(state, action) {
      state.search.query = action.payload.query;
    },
    replaceResults(state, action) {
      state.search.results = action.payload.recipes;
      console.log(state.search.results);
    },
  },
});

const store = configureStore({ reducer: slice.reducer });

export const actions = slice.actions;

export const fetchResults = (query) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}&key=2d03b995-6524-4b23-9d21-fab32287b765`
      );

      if (!response.ok) {
        throw new Error("Could not fetch recipes list!");
      }

      const responseData = await response.json();
      const { recipes } = responseData.data;
      console.log(recipes);

      dispatch(actions.replaceResults({ recipes: recipes }));
    } catch (error) {
      console.error(error);
    }
  };
};

export default store;
