import express from "express";
import Persnickety from "persnickety";
import initRoutes from "./routes/init.mjs";
import initDtos from "./dtos/init.mjs";
import schema from "./swagger.mjs";
import swaggerUi from "swagger-ui-express";

const PORT = process.env.PORT || 3001;
const app = express();
const persnickety = Persnickety(schema, ["/api-docs/*", "/docs"]);

app.use(express.json());
app.use(
  persnickety.requestValidator({
    callback: (req, result) => {
      if (result) {
        console.log("Validation result", result);
      }
    },
  })
);

initDtos();
initRoutes(app);

const genSchema = persnickety.getSchema();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(genSchema));
app.use("/docs", (req, res) => {
  res.header("Content-Type", "application/json");
  res.send(JSON.stringify(genSchema, null, 2));
});

app.listen(PORT, () => console.log(`Serving http://localhost:${PORT}`));
