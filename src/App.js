import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/Error";
import RecipesPage from "./pages/Recipes";
import RecipeDetailsPage from "./pages/RecipeDetails";
import NewRecipePage from "./pages/NewRecipe";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <RecipesPage />,
          children: [
            {
              path: ":id",
              element: <RecipeDetailsPage />,
            },
          ],
        },
        {
          path: "new-recipe",
          element: <NewRecipePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
