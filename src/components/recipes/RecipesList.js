import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResults } from "../../store/recipe-actions";

import RecipeItem from "./RecipeItem";
import LoadingSpinner from "../UI/LoadingSpinner";
import Notification from "../UI/Notification";
import Pagination from "../UI/Pagination";

import classes from "./RecipesList.module.scss";

const RecipesList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.recipe.search.query);
  const searchResults = useSelector((state) => state.recipe.search.results);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const notification = useSelector((state) => state.ui.notification);

  const newSearchResults = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * 10;
    const lastPageIndex = firstPageIndex + 10;
    return searchResults.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, searchResults]);

  useEffect(() => {
    if (searchQuery.length !== 0) {
      dispatch(fetchResults(searchQuery));
    }
  }, [dispatch, searchQuery]);

  return (
    <>
      {(!searchResults ||
        (Array.isArray(searchResults) && searchResults.length === 0)) && (
        <Notification
          notification={{
            status: "error",
            message: "No recipes found for your query! Please try again!",
          }}
        />
      )}
      {notification && searchResults.length === 0 && (
        <Notification notification={notification} />
      )}
      {searchResults.length === 0 && !notification && (
        <Notification
          notification={{
            status: "success",
            message:
              "Start by searching for a recipe or an ingredient. Have fun!!!!",
          }}
        />
      )}
      {searchResults.length !== 0 && (
        <div className={classes["search-results"]}>
          <ul className={classes.results}>
            {newSearchResults.map((recipe) => (
              <RecipeItem key={recipe.id} recipe={recipe} />
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalCount={searchResults.length}
            pageSize={10}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}
      {isLoading && <LoadingSpinner />}
    </>
  );
};

export default RecipesList;
