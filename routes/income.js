import express from "express";
import Joi from "joi";
import incomeSchema from "../validators/income-schema.js";
import { validateUserIncome } from "../middleware/validation.js";
import { v4 as uuidv4 } from "uuid";
import { incomes } from "../database/income-db.js";
import { users } from "../database/users-db.js";
import morgan from "morgan";
const router = express.Router();
router.use(express.json());
router.use(morgan("combined"));
// ============================= CREATE FIRST INCOME ========================================

router.post("/income/add", (req, res) => {
  const { name, amount, username } = req.body;
  const result = incomeSchema.validate(req.body);
  let error;
  if (result.error) {
    error = result.error.details[0].message;
    res.status(400).send(error);
    return;
  }
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(401).send("Unauthorized");
  }
  const newIncome = {
    id: uuidv4(),
    name: name,
    amount: amount,
    userId: user.id,
  };
  incomes.push(newIncome);
  res.status(201).send(incomes);
});

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
// =================================== GET A SPECIFIC INCOME ================================================
router.get("/income/findOne/:userId", (req, res) => {
  let specificIncome = incomes.find((i) => i.userId === req.params.userId);
  if (!specificIncome) {
    return res.status(404).send("Income not found");
  }
  res.send(specificIncome);
});
// =================================== GET A USER`S` SPECIFIC INCOME ================================================
router.get("/income/users/findOne/:id", (req, res) => {
  let specificIncome = incomes.filter((i) => i.id === req.params.id);
  if (!specificIncome) {
    return res.status(404).send("Income not found");
  }
  res.send(specificIncome);
});
// ----------------------------- SWAGGER -----------------------------------------------------------------
/**
 * @swagger
 * /income/users/findOne/id:
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
 * /income/delete/id:
 *   delete:
 *     summary: Income silmek ucun endpoint
 *     responses:
 *       200:
 *         description: Ugurla silindi
 */
// ======================================== UPDATE INCOMES =================================================
console.log(incomes);
export default router;
