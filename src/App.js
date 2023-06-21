import Header from "./components/layout/Header";
import RecipesList from "./components/recipes/RecipesList";

import { recipes } from "./data/recipes-data";

import classes from "./App.module.scss";

const App = () => {
  return (
    <div className={classes.container}>
      <Header />
      <RecipesList recipes={recipes} />
    </div>
  );
};

export default App;
