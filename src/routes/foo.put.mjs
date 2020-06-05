import express from "express";
import { Route } from "persnickety";
import Repository from "../repository.mjs";

const router = express.Router();

export default function initFooPut(Foo = new Repository("foo.json")) {
  Route("/foo/{id}", {
    put: {
      summary: "Creates or updates a Foo by id",
      tags: ["Foo"],
      parameters: [
        {
          $ref: "#/components/parameters/stringIdInPath",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/FooUpsert",
            },
          },
        },
      },
      responses: {
        "200": {
          description: "Foo was updated",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Foo",
              },
            },
          },
        },
        "201": {
          description: "Foo was created",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Foo",
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
    const id = req.params.id;
    const model = { id, ...req.body };
    return Foo.getById(id)
      .then(() => 200)
      .catch(() => 201)
      .then(async (status) => {
        await Foo.add(model);
        res.status(status).json(model);
      });
  });

  return router;
}
