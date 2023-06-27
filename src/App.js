import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/Error";
import RecipesPage from "./pages/Recipes";
import RecipeDetailsPage from "./pages/RecipeDetails";

import { recipeLoader } from "./pages/RecipeDetails";

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
              id: "recipe-details",
              element: <RecipeDetailsPage />,
              loader: recipeLoader,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
