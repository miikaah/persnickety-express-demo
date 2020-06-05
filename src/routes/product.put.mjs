import express from "express";
import { Route } from "persnickety";
import Repository from "../repository.mjs";

const router = express.Router();

const colors = ["black", "red", "white", "blue"];

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function initFooPut(Product = new Repository("product.json")) {
  Route("/product/{id}", {
    put: {
      summary: "Creates or updates a Product by id",
      tags: ["Product"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
        },
        {
          name: "randomizeSecondaryColor",
          in: "query",
          required: true,
          schema: {
            type: "boolean",
          },
        },
        {
          name: "optionalQueryParam",
          in: "query",
          schema: {
            type: "integer",
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/ProductUpsert",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Product was updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        "201": {
          description: "Product was created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Product",
              },
            },
          },
        },
        "400": {
          $ref: "#/components/responses/400",
        },
      },
    },
  });
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { randomizeSecondaryColor } = req.query;

    if (randomizeSecondaryColor) {
      req.body.secondaryColor =
        colors[randomIntFromInterval(0, colors.length - 1)];
    }

    const model = { id, ...req.body };
    return Product.getById(id)
      .then(() => 200)
      .catch(() => 201)
      .then(async (status) => {
        await Product.add(model);
        res.status(status).json(model);
      });
  });

  return router;
}
