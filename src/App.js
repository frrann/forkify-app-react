import Header from "./components/layout/Header";
import classes from "./App.module.scss";

const App = () => {
  return (
    <div className={classes.container}>
      <Header />

      {/* <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id} className={classes.recipe__title}>
            {recipe.title}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default App;
