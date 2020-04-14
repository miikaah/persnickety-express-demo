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
  FooUpsert: {
    type: "object",
    properties: {
      size: {
        type: "number",
      },
    },
  },
};
