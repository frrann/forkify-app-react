import Icons from "../../assets/images/icons.svg";

import classes from "./RecipeItem.module.scss";

const RecipeItem = ({ recipe }) => {
  return (
    <li key={recipe.id} className="preview">
      <a href={recipe.id} className={classes["preview__link"]}>
        <figure className={classes.preview__fig}>
          <img src={recipe.image_url} alt={recipe.title} />
        </figure>
        <div className={classes.preview__data}>
          <h4 className={classes.preview__title}>{recipe.title}</h4>
          <p className={classes.preview__publisher}>{recipe.publisher}</p>
        </div>
        <div className={classes["preview__user-generated"]}>
          <svg>
            <use href={`${Icons}#icon-user`}></use>
          </svg>
        </div>
      </a>
    </li>
  );
};

export default RecipeItem;
