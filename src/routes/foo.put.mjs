import express from "express";
import { Route } from "persnickety";

const router = express.Router();

export default function initFooPut() {
  Route("/foo/{id}", {
    put: {
      summary: "Creates or updates a Foo by id",
      tags: ["Foo"],
      parameters: [
        {
          $ref: "#/components/parameters/stringIdInPath",
        },
      ],
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
        "404": {
          $ref: "#/components/responses/404",
        },
      },
    },
  });
  router.put("/:id", (req, res) => res.send(`Ok Foo PUT ${req.params.id}`));

  return router;
}
