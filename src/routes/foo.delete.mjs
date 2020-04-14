import express from "express";
import { Route } from "persnickety";
import Repository from "../repository.mjs";

const router = express.Router();

export default function initFooDelete(Foo = new Repository("foo.json")) {
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
  router.delete("/:id", async (req, res) => {
    return Foo.getById(req.params.id)
      .then(async () => {
        await Foo.remove(req.params.id);
        res.sendStatus(204);
      })
      .catch(() => res.status(404).send("Not Found"));
  });

  return router;
}
