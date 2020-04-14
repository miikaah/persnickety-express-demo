import initFooGet from "./foo.get.mjs";

export default function initRoutes(app) {
  app.use("/foo", initFooGet());
}
