import { useDispatch } from "react-redux";
import { recipeActions } from "../../store/recipe-slice";
import { fetchResults } from "../../store/recipe-actions";

import Icons from "../../assets/images/icons.svg";

import classes from "./SearchBar.module.scss";

const SearchBar = () => {
  const dispatch = useDispatch();

  const searchHandler = (event) => {
    event.preventDefault();
    dispatch(recipeActions.setQuery({ query: event.target.search.value }));
    dispatch(fetchResults(event.target.search.value));
  };

  return (
    <form className={classes.search} onSubmit={searchHandler}>
      <input
        type="text"
        id="search"
        className={classes.search__field}
        placeholder="Search over 1,000,000 recipes..."
      />
      <button className={`${classes.btn} ${classes.search__btn}`}>
        <svg className={classes.search__icon}>
          <use href={`${Icons}#icon-search`}></use>
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
