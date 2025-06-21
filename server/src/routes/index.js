import authRouter from "./auth.js";
import productCategory from "./product/productCategory.js"
import productRouter from "./product/product.js"

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/category", productCategory);
  app.use("/api/v1/product", productRouter);


  return app.use("/", (req, res) => {
    res.send("server on...");
  });
};

export default initRoutes;
