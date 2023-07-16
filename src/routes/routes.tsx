import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./PrivateRoute";
import AllBooks from "../pages/AllBooks";
import AddNewBook from "../pages/AddNewBook";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/add-books",
        element: (
          <PrivateRoute>
            <AddNewBook />,
          </PrivateRoute>
        ),
      },
      {
        path: "/all-books",
        element: <AllBooks />,
      },
      // {
      //   path: '/products',
      //   element: <Products />,
      // },
      // {
      //   path: '/product-details/:id',
      //   element: <ProductDetails />,
      // },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
