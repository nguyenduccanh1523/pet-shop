import Blog from "../views/app/blog";
import BlogDetail from "../views/components/blog/blogDetail";
import Cart from "../views/app/cart";
import Checkout from "../views/app/checkout";
import Contact from "../views/app/contact";
import Favorite from "../views/app/favorite";
import Homepage from "../views/app/home";
import Shopage from "../views/app/shop";
import SingleProduct from "../views/app/singleProduct";
import Store from "../views/app/store";
import Support from "../views/app/support";
import SingleStore from "../views/components/store/SingleStore/singleStore";
import Login from "../views/auth/login";
import Register from "../views/auth/register";



export const DefaultRouter = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/shop",
    element: <Shopage />,
  },
  {
    path: "/shop/:categorySlug",
    element: <Shopage />,
  },
  {
    path: "/product",
    element: <SingleProduct />,
  },
  {
    path: "/product/:productId",
    element: <SingleProduct />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/single-store",
    element: <SingleStore />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blog/category/:categorySlug",
    element: <Blog />,
  },
  {
    path: "/blog/:id",
    element: <BlogDetail />,
  },
  {
    path: "/favorite",
    element: <Favorite />,
  },
  {
    path: "/support",
    element: <Support />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  
];
