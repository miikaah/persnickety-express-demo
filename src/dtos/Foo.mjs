export default {
  Foo: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      size: {
        type: "number",
      },
    },
  },
};

export const FooIdParam = {
  name: "id",
  in: "path",
  required: true,
  schema: {
    type: "string",
  },
};
