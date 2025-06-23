import authRouter from "./auth.js";
import productCategory from "./product/productCategory.js"
import productRouter from "./product/product.js"
import blogCategoryRouter from "./blog/blogCategory.js"
import blogRouter from "./blog/blog.js"

const initRoutes = (app) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/category", productCategory);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/blog-categories", blogCategoryRouter);
  app.use("/api/v1/blogs", blogRouter);



  return app.use("/", (req, res) => {
    res.send("server on...");
  });
};

export default initRoutes;
