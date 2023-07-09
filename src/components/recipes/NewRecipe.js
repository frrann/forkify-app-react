import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { sendData } from "../../store/recipe-actions";

import LoadingSpinner from "../UI/LoadingSpinner";
import Icons from "../../assets/images/icons.svg";

import classes from "./NewRecipe.module.scss";
import Notification from "../UI/Notification";

const NewRecipe = () => {
  const titleInputRef = useRef();
  const urlInputRef = useRef();
  const imageInputRef = useRef();
  const publisherInputRef = useRef();
  const prepTimeInputRef = useRef();
  const servingsInputRef = useRef();
  const ingredient1 = useRef();
  const ingredient2 = useRef();
  const ingredient3 = useRef();
  const ingredient4 = useRef();
  const ingredient5 = useRef();
  const ingredient6 = useRef();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const notification = useSelector((state) => state.ui.notification);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const ingredients = [
      ingredient1,
      ingredient2,
      ingredient3,
      ingredient4,
      ingredient5,
      ingredient6,
    ]
      .map((ingr) => ingr.current.value)
      .map((ingr) => {
        const ingrArr = ingr.split(",").map((el) => el.trim());

        if (ingrArr.length !== 3) throw new Error("Wrong ingredient format");

        const [quantity, unit, description] = ingrArr;
        return {
          quantity: quantity ? +quantity : null,
          unit,
          description,
        };
      });

    const newRecipe = {
      title: titleInputRef.current.value,
      source_url: urlInputRef.current.value,
      image_url: imageInputRef.current.value,
      publisher: publisherInputRef.current.value,
      cooking_time: +prepTimeInputRef.current.value,
      servings: servingsInputRef.current.value,
      ingredients,
    };

    dispatch(sendData(newRecipe));
  };

  const closeModalHandler = () => {
    navigate("..");
  };

  return (
    <div className={classes["add-recipe-window"]}>
      <button
        className={classes["btn--close-modal"]}
        type="button"
        onClick={closeModalHandler}
      >
        &times;
      </button>
      {isLoading && <LoadingSpinner />}
      {notification && <Notification notification={notification} />}
      {!isLoading && !notification && (
        <form className={classes.upload} onSubmit={formSubmitHandler}>
          <div className={classes.upload__column}>
            <h3 className={classes.upload__heading}>Recipe data</h3>
            <label htmlFor="title">Title</label>
            <input id="title" type="text" ref={titleInputRef} />
            <label htmlFor="url">URL</label>
            <input id="url" type="text" ref={urlInputRef} />
            <label htmlFor="image_url">Image URL</label>
            <input id="image_url" type="text" ref={imageInputRef} />
            <label htmlFor="publisher">Publisher</label>
            <input id="publisher" type="text" ref={publisherInputRef} />
            <label htmlFor="prep_time">Prep time</label>
            <input id="prep_time" type="number" ref={prepTimeInputRef} />
            <label htmlFor="servings">Servings</label>
            <input id="servings" type="text" ref={servingsInputRef} />
          </div>

          <div className={classes.upload__column}>
            <h3 className={classes.upload__heading}>Ingredients</h3>

            <label htmlFor="ingredient-1">Ingredient 1</label>
            <input
              id="ingredient-1"
              type="text"
              placeholder="Format: 'Quantity, Unit, Description'"
              ref={ingredient1}
            />
            <label htmlFor="ingredient-2">Ingredient 2</label>
            <input
              id="ingredient-2"
              type="text"
              placeholder="Format: 'Quantity, Unit, Description'"
              ref={ingredient2}
            />
            <label htmlFor="ingredient-3">Ingredient 3</label>
            <input
              id="ingredient-3"
              type="text"
              placeholder="Format: 'Quantity, Unit, Description'"
              ref={ingredient3}
            />
            <label htmlFor="ingredient-4">Ingredient 4</label>
            <input
              id="ingredient-4"
              type="text"
              placeholder="Format: 'Quantity, Unit, Description'"
              ref={ingredient4}
            />
            <label htmlFor="ingredient-5">Ingredient 5</label>
            <input
              id="ingredient-5"
              type="text"
              placeholder="Format: 'Quantity, Unit, Description'"
              ref={ingredient5}
            />
            <label htmlFor="ingredient-6">Ingredient 6</label>
            <input
              id="ingredient-6"
              type="text"
              placeholder="Format: 'Quantity, Unit, Description'"
              ref={ingredient6}
            />
          </div>

          <button
            className={`${classes.btn} ${classes.upload__btn}`}
            type="submit"
          >
            <svg>
              <use href={`${Icons}#icon-upload-cloud`}></use>
            </svg>
            <span>Upload</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default NewRecipe;
