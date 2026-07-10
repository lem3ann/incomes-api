import express from "express";
import { incomes } from "../database/income-db.js";
import { users } from "../database/users-db.js";
const router = express.Router();
router.use(express.json());
router.get("/users/incomes/getAll", (req, res) => {
  let userCopy = [...users];
  if (!userCopy) {
    return res.status(400).send("Bad request");
  }
  let userIncomeData = userCopy.map((user) => {
    user.relatedIncome = incomes.filter((income) => user.id === income.userId);
    return user;
  });
  console.log(userIncomeData);
  if (userIncomeData) {
    return res.send(userIncomeData);
  } else {
    res.status(400).send("bad request");
  }
});
export default router;
// [
//     {
//         "id": "c32dfd4e-af4c-4067-b95b-7883e3ba3f39",
//         "name": "Laman",
//         "surname": "Latifova",
//         "username": "llamann",
//         "email": "latifovaa.laman@mail.ru",
//         "phone": "508596968",
//         "password": "85565656"
//     },
//     {
//         "id": "74c35883-9b87-4e36-8852-7eaf9b92a0cc",
//         "name": "Laman",
//         "surname": "Latifova",
//         "username": "laman",
//         "email": "latifovaa.laman@mail.ru",
//         "phone": "508596968",
//         "password": "85565656"
//     }
// ]
// =========================== income =============
// [
//     {
//         "id": "b3d6f53e-0b21-4216-8c72-3d60982bde97",
//         "name": "test",
//         "amount": 454,
//         "userId": "c32dfd4e-af4c-4067-b95b-7883e3ba3f39"
//     }
// ]
