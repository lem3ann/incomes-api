import express from "express";
import Joi from "joi";
import incomeSchema from "../validators/income-schema.js";
import { validateUserIncome } from "../middleware/validation.js";
import { v4 as uuidv4 } from "uuid";
import { incomes } from "../database/income-db.js";
import morgan from "morgan";
const router = express.Router();
router.use(express.json());
// ============================= CREATE FIRST INCOME ========================================

router.post("/income/add", (req, res) => {
  const { name, amount, userId } = req.body;
  const newIncome = {
    id: uuidv4(),
    name: name,
    amount: amount,
    userId: userId,
  };
  const result = incomeSchema.validate(req.body);
  let error;
  if (result.error) {
    error = result.error.details[0].message;
    res.status(400).send(error);
    return;
  }
  if (incomes) {
    const myIncome = incomes.find((f) => f.username === req.body.username);
    if (!myIncome) {
      return res.send("Unauthorized").status(401);
    }
    incomes.push(newIncome);
    res.send(incomes);
  }
});
router.use(morgan("combined"));
// ----------------------------------------------------- SWAGGER ---------------------------------------------------
/**
 * @swagger
 * /income:
 *   post:
 *     summary: yeni income yaradan api
 *     responses:
 *       201:
 *         description: Ugurlu
 */
// ========================================= GET ALL INCOMES ================================================
router.get("/income/all", (req, res) => {
  res.send(incomes);
});
// =================================== GET A USER`S` SPECIFIC INCOME ================================================
router.get("/income/findOne/:userId", (req, res) => {
  let specificIncome = incomes.find((i) => i.userId === req.params.userId);
  if (!specificIncome) {
    return res.send("Income not found").status(404);
  }
  res.send(specificIncome);
});
// =================================== GET A SPECIFIC INCOME ================================================
router.get("/income/users/findOne/:id", (req, res) => {
  let specificIncome = incomes.find((i) => i.id === req.params.id);
  if (!specificIncome) {
    return res.send("Income not found").status(404);
  }
  res.send(specificIncome);
});
// ----------------------------- SWAGGER -----------------------------------------------------------------
/**
 * @swagger
 * /income/id:
 *   get:
 *     summary: id`e gore income getiren endpoint
 *     responses:
 *       200:
 *         description: Ugurlu
 */
// =========================================== REMOVE INCOMES ===============================================
router.delete("/income/delete/:id", (req, res) => {
  let deletedIncome = incomes.find((i) => i.userId === req.params.id);
  if (!deletedIncome) return res.send("Not found");
  let incomeIndex = incomes.indexOf(deletedIncome);
  incomes.splice(incomeIndex, 1);
  res.send(`deleted element:${JSON.stringify(deletedIncome)}`);
});
// ----------------------------- SWAGGER -----------------------------
/**
 * @swagger
 * /income:
 *   delete:
 *     summary: Income silmek ucun endpoint
 *     responses:
 *       200:
 *         description: Ugurla silindi
 */
// ======================================== UPDATE INCOMES =================================================
console.log(incomes);
export default router;
