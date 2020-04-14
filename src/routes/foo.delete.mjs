import express from "express";
import { Route } from "persnickety";

const router = express.Router();

export default function initFooDelete() {
  Route("/foo/{id}", {
    delete: {
      summary: "Deletes a Foo by id",
      tags: ["Foo"],
      parameters: [
        {
          $ref: "#/components/parameters/stringIdInPath",
        },
      ],
      responses: {
        "204": {
          description: "Foo was deleted",
        },
        "404": {
          $ref: "#/components/responses/404",
        },
      },
    },
  });
  router.delete("/:id", (req, res) =>
    res.send(`Ok Foo DELETE ${req.params.id}`)
  );

  return router;
}
