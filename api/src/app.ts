import Express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import productRouter from "./routes/productRouter";
import { swaggerSpec } from "./utils/swagger";

const app = Express();

app.use(Express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/", productRouter);

export default app;
