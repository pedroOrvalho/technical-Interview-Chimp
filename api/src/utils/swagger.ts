import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product API Documentation",
      version: "1",
    },
    servers: [
      {
        url: "http://localhost:4000/",
      },
    ],
  },
  apis: ["./routes/productRouter.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
