import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RecipeItem from "./RecipeItem";
import LoadingSpinner from "../UI/LoadingSpinner";

import { fetchResults } from "../../store/recipe-actions";

import Icons from "../../assets/images/icons.svg";
import classes from "./RecipesList.module.scss";

const RecipesList = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.recipe.search.query);
  const searchResults = useSelector((state) => state.recipe.search.results);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const error = useSelector((state) => state.ui.error);

  useEffect(() => {
    if (searchQuery.length !== 0) {
      dispatch(fetchResults(searchQuery));
    }
  }, [dispatch, searchQuery]);

  return (
    <>
      {error && (
        <div>
          <div className={classes.error}>
            <div>
              <svg>
                <use href={`${Icons}#icon-alert-triangle`}></use>
              </svg>
            </div>
            <p>{error}</p>
          </div>
        </div>
      )}
      {!isLoading && searchResults.length === 0 && (
        <div>
          <div className={classes.message}>
            <div>
              <svg>
                <use href={`${Icons}#icon-smile`}></use>
              </svg>
            </div>
            <p>
              Start by searching for a recipe or an ingredient. Have fun!!!!
            </p>
          </div>
        </div>
      )}
      {!isLoading && searchResults.length !== 0 && (
        <div className={classes["search-results"]}>
          <ul className={classes.results}>
            {searchResults.map((recipe) => (
              <RecipeItem key={recipe.id} recipe={recipe} />
            ))}
          </ul>
        </div>
      )}
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default RecipesList;
