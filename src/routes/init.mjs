import initFooGet from "./foo.get.mjs";
import initFooPut from "./foo.put.mjs";
import initFooDelete from "./foo.delete.mjs";

export default function initRoutes(app) {
  app.use("/foo", initFooGet());
  app.use("/foo", initFooPut());
  app.use("/foo", initFooDelete());
}
