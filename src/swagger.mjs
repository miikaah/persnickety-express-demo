export default {
  openapi: "3.0.0",
  info: {
    title: "Persnickety Node demo",
  },
  servers: [
    {
      url: "http://localhost:3001",
    },
  ],
  tags: [
    {
      name: "Foo",
    },
  ],
  components: {
    parameters: {
      stringIdInPath: {
        name: "id",
        in: "path",
        required: true,
        schema: {
          type: "string",
        },
      },
    },
    responses: {
      "400": {
        description: `Bad Request`,
        content: {
          "text/plain": {
            schema: {
              type: "string",
            },
          },
        },
      },
      "404": {
        description: `Resource not found`,
        content: {
          "text/plain": {
            schema: {
              type: "string",
            },
          },
        },
      },
    },
  },
};
