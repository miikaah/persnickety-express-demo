import express from "express";
import { Route } from "persnickety";
import Repository from "../repository.mjs";

const router = express.Router();

export default function initFooGet(Foo = new Repository("foo.json")) {
  Route("/foo", {
    get: {
      summary: "Returns all Foos",
      tags: ["Foo"],
      responses: {
        "200": {
          description: "A JSON array of Foos",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/Foo",
                },
              },
            },
          },
        },
      },
    },
  });
  router.get("/", async (req, res) => {
    res.json(await Foo.getAll());
  });

  Route("/foo/{id}", {
    get: {
      summary: "Returns a Foo by id",
      tags: ["Foo"],
      parameters: [
        {
          $ref: "#/components/parameters/stringIdInPath",
        },
      ],
      responses: {
        "200": {
          description: "A Foo",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Foo",
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
    return Foo.getById(req.params.id)
      .then((model) => res.json(model))
      .catch(() => res.status(404).send("Not Found"));
  });

  return router;
}
