import RecipeItem from "./RecipeItem";

import classes from "./RecipesList.module.scss";

const RecipesList = ({ recipes }) => {
  return (
    <div className={classes["search-results"]}>
      <ul className={classes.results}>
        {recipes.map((recipe) => (
          <RecipeItem key={recipe.id} recipe={recipe} />
        ))}
      </ul>
    </div>
  );
};

export default RecipesList;
