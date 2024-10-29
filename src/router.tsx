import { createBrowserRouter } from "react-router-dom";
import { action as deleteProductAction } from "./components/ProductDetails/index";
import Layout from "./layouts/Layout";
import EditProduct, { action as editProductAction, loader as editProductLoader } from "./views/EditProduct";
import NewProduct, { action as newProductAction } from "./views/NewProduct";
import Products, { loader as productsLoader, action as updateAvailabilityAction } from "./views/Products";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        action: updateAvailabilityAction,
        loader: productsLoader,
      },
      {
        path: "products/new",
        element: <NewProduct />,
        action: newProductAction,
      },
      {
        path: "products/edit/:id", //ROA Pattern - Resource-oriented design
        element: <EditProduct />,
        action: editProductAction,
        loader: editProductLoader,
      },
      {
        path: "products/delete/:id", 
        element: <EditProduct />,
        action: deleteProductAction,
      },
    ],
  },
]);
