import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipe: {},
  bookmarks: [],
  search: {
    query: "",
    results: [],
  },
};

export const recipeSlice = createSlice({
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
    setQuery(state, action) {
      state.search.query = action.payload.query;
    },
    replaceResults(state, action) {
      state.search.results = action.payload.recipes;
    },
  },
});

export const recipeActions = recipeSlice.actions;
