import express from "express";
import { Route } from "persnickety";
import { FooIdParam } from "../dtos/Foo.mjs";
import { NotFound } from "../swagger.mjs";

const router = express.Router();

export default function initFooPut() {
  Route("/foo/{id}", {
    put: {
      summary: "Creates or updates a Foo by id",
      tags: ["Foo"],
      parameters: [FooIdParam],
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
        ...NotFound("Foo"),
      },
    },
  });
  router.put("/:id", (req, res) => res.send(`Ok Foo PUT ${req.params.id}`));

  return router;
}
