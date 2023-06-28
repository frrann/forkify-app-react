import { useDispatch } from "react-redux";
import { actions } from "../../store";

import Icons from "../../assets/images/icons.svg";

import classes from "./SearchBar.module.scss";
import { useState } from "react";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const searchInputHandler = (event) => {
    setQuery(event.target.value);
  };

  const searchHandler = (event) => {
    event.preventDefault();
    dispatch(actions.searchResults({ query: event.target.search.value }));
    setQuery("");
  };

  return (
    <form className={classes.search} onSubmit={searchHandler}>
      <input
        type="text"
        id="search"
        className={classes.search__field}
        placeholder="Search over 1,000,000 recipes..."
        value={query}
        onChange={searchInputHandler}
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
