import express from "express";
import { Route } from "persnickety";
import { FooIdParam } from "../dtos/Foo.mjs";
import { NotFound } from "../swagger.mjs";

const router = express.Router();

export default function initFooGet() {
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
  router.get("/", (req, res) => res.send("Ok Foo"));

  Route("/foo/{id}", {
    get: {
      summary: "Returns a Foo by id",
      tags: ["Foo"],
      parameters: [FooIdParam],
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
        ...NotFound("Foo"),
      },
    },
  });
  router.get("/:id", (req, res) => res.send(`Ok Foo ${req.params.id}`));

  return router;
}
