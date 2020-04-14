import express from "express";
import { Route } from "persnickety";
import { FooIdParam } from "../dtos/Foo.mjs";
import { NotFound } from "../swagger.mjs";

const router = express.Router();

export default function initFooDelete() {
  Route("/foo/{id}", {
    delete: {
      summary: "Deletes a Foo by id",
      tags: ["Foo"],
      parameters: [FooIdParam],
      responses: {
        "200": {
          description: "Foo was deleted",
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
  router.delete("/:id", (req, res) =>
    res.send(`Ok Foo DELETE ${req.params.id}`)
  );

  return router;
}
