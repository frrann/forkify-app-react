import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import Logo from "../../assets/images/logo.png";
import Icons from "../../assets/images/icons.svg";

import classes from "./Header.module.scss";

const Header = () => {
  const navContent = (
    <nav className={classes.nav}>
      <ul className={classes.nav__list}>
        <li className={classes.nav__item}>
          <button
            className={`${classes.nav__btn} ${classes["nav__btn--add-recipe"]}`}
          >
            <svg className={classes.nav__icon}>
              <use href={`${Icons}#icon-edit`}></use>
            </svg>
            <span>Add recipe</span>
          </button>
        </li>
        <li className={classes.nav__item}>
          <button
            className={`${classes.nav__btn} ${classes["nav__btn--bookmarks"]}`}
          >
            <svg className={classes.nav__icon}>
              <use href={`${Icons}#icon-bookmark`}></use>
            </svg>
            <span>Bookmarks</span>
          </button>
          <div className={classes.bookmarks}>
            <ul className={classes.bookmarks__list}>
              <div className={classes.message}>
                <div>
                  <svg>
                    <use href={`${Icons}#icon-alert-triangle`}></use>
                  </svg>
                </div>
                <p>No bookmarks yet. Find a nice recipe and bookmark it :)</p>
              </div>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );

  return (
    <header className={classes.header}>
      <Link to="/">
        <img src={Logo} alt="Logo" className={classes.header__logo} />
      </Link>
      <SearchBar />
      {navContent}
    </header>
  );
};

export default Header;
