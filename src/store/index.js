import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipe: {},
  bookmarks: [],
  search: {},
};

const slice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    setRecipe(state, action) {
      const crtRecipe = action.payload;
      state.recipe = crtRecipe;
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
  },
});

const store = configureStore({ reducer: slice.reducer });

export const actions = slice.actions;

export default store;
