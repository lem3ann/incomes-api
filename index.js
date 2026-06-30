import express from "express";
import router from "./routes/register.js";
const app = express();
const port = process.env.PORT || 3000;
// ============================================= REGISTER  ====================================================
app.use("/api", router);
app.listen(port, () => {
  console.log(`Server running port:${port}`);
});
