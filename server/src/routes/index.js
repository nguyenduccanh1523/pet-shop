import authRouter from "./auth.js";
import productCategory from "./product/productCategory.js"

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/category", productCategory);


  return app.use("/", (req, res) => {
    res.send("server on...");
  });
};

export default initRoutes;
