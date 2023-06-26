import { useParams } from "react-router-dom";

import Icons from "../../assets/images/icons.svg";
import { recipes } from "../../data/recipes-data";

import classes from "./RecipeItemDetails.module.scss";

const RecipeDetails = () => {
  const params = useParams();

  // get recipe by params.id
  // fetch...
  const recipe = recipes.filter((recipe) => recipe.id === params.id)[0]
    .recipeDetails;

  return (
    // <div className={classes.recipe}>
    //   <div className={classes.message}>
    //     <div>
    //       <svg>
    //         <use href={`${Icons}#icon-smile`}></use>
    //       </svg>
    //     </div>
    //     <p>Start by searching for a recipe or an ingredient. Have fun!!!!</p>
    //   </div>
    // </div>

    <div className={classes.recipe}>
      <figure className={classes.recipe__fig}>
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className={classes.recipe__img}
        />
        <h1 className={classes.recipe__title}>
          <span>{recipe.title}</span>
        </h1>
      </figure>

      <div className={classes.recipe__details}>
        <div className={classes.recipe__info}>
          <svg className={classes["recipe__info-icon"]}>
            <use href={`${Icons}#icon-clock`}></use>
          </svg>
          <span
            className={`${classes["recipe__info-data"]} ${classes["recipe__info-data--minutes"]}`}
          >
            {recipe.cooking_time}
          </span>
          <span className={classes["recipe__info-text"]}>minutes</span>
        </div>

        <div className={classes.recipe__info}>
          <svg className={classes["recipe__info-icon"]}>
            <use href={`${Icons}#icon-users`}></use>
          </svg>
          <span>{recipe.servings}</span>
          <span>servings</span>

          <div className={classes["recipe__info-buttons"]}>
            <button
              className={`${classes["btn--tiny"]} ${classes["btn--update-servings"]}`}
            >
              <svg>
                <use href={`${Icons}#icon-minus-circle`}></use>
              </svg>
            </button>
            <button
              className={`${classes["btn--tiny"]} ${classes["btn--update-servings"]}`}
            >
              <svg>
                <use href={`${Icons}#icon-plus-circle`}></use>
              </svg>
            </button>
          </div>
        </div>

        <div className={classes["recipe__user-generated"]}>
          <svg>
            <use href={`${Icons}#icon-user`}></use>
          </svg>
        </div>

        <button
          className={`${classes["btn--round"]} ${classes["btn--bookmark"]}`}
        >
          <svg>
            <use href={`${Icons}#icon-bookmark`}></use>
          </svg>
        </button>

        <button
          className={`${classes["btn--round"]} ${classes["btn--delete"]}`}
        >
          <svg>
            <use href={`${Icons}#icon-delete`}></use>
          </svg>
        </button>
      </div>

      <div className={classes.recipe__ingredients}>
        <h2 className={classes["heading--2"]}>Recipe ingredients</h2>
        <ul className={classes["recipe__ingredient-list"]}>
          {recipe.ingredients.map((ingr) => (
            <li key={ingr.description} className={classes.recipe__ingredient}>
              <svg className={classes.recipe__icon}>
                <use href={`${Icons}#icon-check`}></use>
              </svg>
              <div className={classes.recipe__quantity}>{ingr.quantity}</div>
              <div className={classes.recipe__description}>
                <span className={classes.recipe__unit}>{ingr.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={classes.recipe__directions}>
        <h2 className={classes["heading--2"]}>How to cook it</h2>
        <p className={classes["recipe__directions-text"]}>
          This recipe was carefully designed and tested by
          <span className={classes.recipe__publisher}>{recipe.publisher}</span>.
          Please check out directions at their website.
        </p>
        <a
          className={`${classes["btn--small"]} ${classes.recipe__btn}`}
          href={recipe.source_url}
        >
          <span>Directions</span>
          <svg className={classes.search__icon}>
            <use href={`${Icons}#icon-arrow-right`}></use>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default RecipeDetails;
