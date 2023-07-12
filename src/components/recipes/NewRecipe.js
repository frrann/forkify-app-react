import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { sendData } from "../../store/recipe-actions";
import { uiActions } from "../../store/ui-slice";

import LoadingSpinner from "../UI/LoadingSpinner";
import Notification from "../UI/Notification";
import Input from "../UI/Input";

import Icons from "../../assets/images/icons.svg";

import classes from "./NewRecipe.module.scss";

const NewRecipe = () => {
  const titleInputRef = useRef();
  const urlInputRef = useRef();
  const imageInputRef = useRef();
  const publisherInputRef = useRef();
  const prepTimeInputRef = useRef();
  const servingsInputRef = useRef();

  const initialIngredientState = { quantity: 0, unit: "", description: "" };

  const [ingredientsList, setIngredientsList] = useState([
    initialIngredientState,
  ]);

  const addIngredientHandler = () => {
    if (ingredientsList.length < 6) {
      setIngredientsList([...ingredientsList, initialIngredientState]);
    }
  };

  const removeIngredientHandler = (index) => {
    const updatedIngredients = [...ingredientsList];
    updatedIngredients.splice(index, 1);
    setIngredientsList(updatedIngredients);
  };

  const inputChangeHandler = (index, updatedIngredient) => {
    const updatedIngredients = [...ingredientsList];
    updatedIngredients[index] = updatedIngredient;
    setIngredientsList(updatedIngredients);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.ui.isLoading);
  const notification = useSelector((state) => state.ui.notification);

  const formSubmitHandler = (event) => {
    event.preventDefault();

    const newRecipe = {
      title: titleInputRef.current.value,
      source_url: urlInputRef.current.value,
      image_url: imageInputRef.current.value,
      publisher: publisherInputRef.current.value,
      cooking_time: +prepTimeInputRef.current.value,
      servings: servingsInputRef.current.value,
      ingredients: ingredientsList,
    };

    dispatch(sendData(newRecipe));
  };

  const closeModalHandler = () => {
    navigate("..");
    dispatch(uiActions.setNotification(null));
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

            <div
              style={{
                gridColumnStart: 1,
                gridColumnEnd: 3,
              }}
            >
              {ingredientsList.map((ingr, index) => (
                <Input
                  key={`ingredient${index}`}
                  index={index}
                  ingredient={ingr}
                  onIngredientChange={(updatedIngredient) =>
                    inputChangeHandler(index, updatedIngredient)
                  }
                  onRemoveIngredient={removeIngredientHandler}
                />
              ))}
              {ingredientsList.length < 6 && (
                <button
                  className={`${classes.btn} ${classes.upload__btn}`}
                  type="button"
                  onClick={addIngredientHandler}
                >
                  <svg>
                    <use href={`${Icons}#icon-upload-cloud`}></use>
                  </svg>
                  <span>Add new ingredient</span>
                </button>
              )}
            </div>
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
