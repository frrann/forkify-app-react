import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import RecipeItem from "./RecipeItem";

import { fetchResults } from "../../store";

import Icons from "../../assets/images/icons.svg";
import classes from "./RecipesList.module.scss";

const RecipesList = ({ recipes }) => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.query);
  const searchResults = useSelector((state) => state.search.results);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.length !== 0) {
      setIsLoading(true);
      dispatch(fetchResults(searchQuery));
    }
  }, [dispatch, searchQuery]);

  return (
    <>
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
      {isLoading && searchResults.length === 0 && (
        <div className={classes.spinner}>
          <svg>
            <use href={`${Icons}#icon-loader`}></use>
          </svg>
        </div>
      )}
      {searchResults.length !== 0 && (
        <div className={classes["search-results"]}>
          <ul className={classes.results}>
            {searchResults.map((recipe) => (
              <RecipeItem key={recipe.id} recipe={recipe} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default RecipesList;
