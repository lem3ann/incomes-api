import express from "express";
import Joi from "joi";
import {
    validateUserIncome
} from "../middleware/validation.js";
const router = express.Router();
router.use(express.json());
// ============================= CREATE FIRST INCOME ========================================
const incomes = [];
router.post("/income", validateUserIncome, (req, res) => {
    const {
        name,
        amount,
        userId
    } = req.body;
    const newIncome = {
        name: name,
        amount: amount,
        userId: userId
    };
    incomes.push(newIncome);
    res.send(incomes);
});
// ========================================= GET ALL INCOMES =================================
router.get("/income", (req, res) => {
    res.send(incomes);
});
export default router;