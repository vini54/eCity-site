import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "./pages/home";
import { HeaderLayout } from "./layouts/Header";
import { CartPage } from "./pages/cart";

export const Router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);
