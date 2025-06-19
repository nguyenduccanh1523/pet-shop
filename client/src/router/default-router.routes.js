import Homepage from "../views/app/home";
import Shopage from "../views/app/shop";
import SingleProduct from "../views/app/singleProduct";



export const DefaultRouter = [
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/shop",
    element: <Shopage />,
  },
  {
    path: "/product",
    element: <SingleProduct />,
  }
  
];
