import express from "express";
import Joi from "joi";
const router = express.Router();
router.use(express.json());
router.get("/login/:userId/income/:incomeId", (req, res) => {});
