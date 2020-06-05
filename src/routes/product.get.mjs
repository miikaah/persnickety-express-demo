import express from "express";
import { Route } from "persnickety";
import Repository from "../repository.mjs";

const router = express.Router();

export default function initProductGet(
  Product = new Repository("product.json")
) {
  Route("/product/{id}", {
    get: {
      summary: "Returns a Product by id",
      tags: ["Product"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "number",
          },
        },
      ],
      responses: {
        "200": {
          description: "A Product",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        "404": {
          $ref: "#/components/responses/404",
        },
      },
    },
  });
  router.get("/:id", async (req, res) => {
    return Product.getById(req.params.id)
      .then((model) => res.json(model))
      .catch(() => res.status(404).send("Not Found"));
  });

  return router;
}
