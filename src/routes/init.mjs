import initFooGet from "./foo.get.mjs";
import initFooPut from "./foo.put.mjs";
import initFooDelete from "./foo.delete.mjs";
import initProductGet from "./product.get.mjs";
import initProductPut from "./product.put.mjs";

export default function initRoutes(app) {
  app.use("/foo", initFooGet());
  app.use("/foo", initFooPut());
  app.use("/foo", initFooDelete());
  app.use("/product", initProductGet());
  app.use("/product", initProductPut());
}
