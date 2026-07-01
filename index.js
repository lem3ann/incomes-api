import express from "express";
import router from "./routes/register.js";
import incomeRouter from "./routes/income.js";
import mixRouter from "./routes/users-income-mix.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";
const app = express();
const port = process.env.PORT || 3000;
// ============================================= REGISTER  ====================================================
app.use("/api", router);
app.use("/api", incomeRouter);
app.use("/api", mixRouter);
//============================== swagger  ===========================
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.listen(port, () => {
  console.log(`Server running port:${port}`);
});