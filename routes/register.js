import express from "express";
import Joi from "joi";
import {
  validateUserData,
  validateUserLogin,
} from "../middleware/validation.js";
import { v4 as uuidv4 } from "uuid";
import morgan from "morgan";
const router = express.Router();

const users = [];
router.use(express.json());

// ================================================ REGISTER ================================================================
router.post("/register", validateUserData, (req, res) => {
  const { name, surname, username, email, password, phone } = req.body;

  const newUser = {
    id: uuidv4(),
    name: name,
    surname: surname,
    username: username,
    email: email,
    phone: phone,
    password: password,
  };
  const duplicateData = users.find((c) => c.username === newUser.username);
  if (duplicateData) {
    return res.send("Duplicate Data!");
  }
  users.push(newUser);
  res.send(users, "successfully created").status(201);
});
// morgan("dev");
// ==================================================== LOGIN ==============================================================
router.post("/login", validateUserLogin, (req, res) => {
  const { name, surname, username, email, password, phone } = req.body;
  const currentUser = {
    id: uuidv4(),
    username: username,
    password: password,
  };
  // check compatibility
  let mainUser = users.find(
    (u) =>
      u.username === currentUser.username &&
      u.password === currentUser.password,
  );
  if (mainUser) {
    res.send("Login successfully");
  } else {
    res.send("Login failed").status(400);
  }
});
// =====================================================  GET ALL USERS ================================================
router.get("/login", (req, res) => {
  res.send(users);
});
// =========================================== DELETE USER ============================================================
router.delete("/login/:id", (req, res) => {
  let mainUser = users.find((u) => u.id === parseFloat(req.params.id));
  let deletedPerson = users.indexOf(mainUser);
  users.splice(deletedPerson, 1);
  res.send(users);
});

export default router;
