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
};

export const NotFound = (modelName) => ({
  "404": {
    description: `${modelName} not found`,
    content: {
      "text/plain": {
        schema: {
          type: "string",
        },
      },
    },
  },
});
