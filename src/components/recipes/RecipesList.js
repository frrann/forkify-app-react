import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResults } from "../../store/recipe-actions";

import RecipeItem from "./RecipeItem";
import LoadingSpinner from "../UI/LoadingSpinner";
import Notification from "../UI/Notification";

import classes from "./RecipesList.module.scss";

const RecipesList = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.recipe.search.query);
  const searchResults = useSelector((state) => state.recipe.search.results);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (searchQuery.length !== 0) {
      dispatch(fetchResults(searchQuery));
    }
  }, [dispatch, searchQuery]);

  return (
    <>
      {notification && searchResults.length === 0 && (
        <Notification notification={notification} />
      )}
      {!isLoading && searchResults.length === 0 && !notification && (
        <Notification
          notification={{
            status: "success",
            message:
              "Start by searching for a recipe or an ingredient. Have fun!!!!",
          }}
        />
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
