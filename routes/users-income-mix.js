import express from "express";
import {
    incomes
} from "../database/income-db.js";
import {
    users
} from "../database/users-db.js";
const router = express.Router();
router.use(express.json());
router.get("/users/incomes", (req, res) => {
    res.send(incomes);
    // users array --> users.id ===  income array ---> userId
    users.forEach(u => {
        u.forEach(e)
    })
    // structure 
    // userId:
    //        incomes:
    //        incomes:
    //        incomes:
    //        incomes:
});
export default router;