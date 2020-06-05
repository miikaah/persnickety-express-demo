export default {
  Product: {
    type: "object",
    properties: {
      id: {
        type: "number",
      },
      size: {
        type: "string",
      },
      mainColor: {
        type: "string",
      },
      secondaryColor: {
        type: "string",
      },
    },
  },
  ProductUpsert: {
    type: "object",
    properties: {
      size: {
        type: "string",
      },
      mainColor: {
        type: "string",
      },
      secondaryColor: {
        type: "string",
      },
    },
    required: ["size", "mainColor"],
  },
};
