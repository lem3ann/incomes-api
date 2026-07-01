import express from "express";
import Joi from "joi";
import {
  validateUserData,
  validateUserLogin,
} from "../middleware/validation.js";
import userSchema from "../validators/register-schema.js";
import loginSchema from "../validators/login-schema.js";
import { users } from "../database/users-db.js";
import { v4 as uuidv4 } from "uuid";
import morgan from "morgan";
const router = express.Router();

router.use(express.json());

// ================================================ REGISTER ================================================================
router.post("/register", (req, res) => {
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
  const result = userSchema.validate(req.body);
  let error;
  if (result.error) {
    error = result.error.details[0].message;
    res.status(400).send(error);
    return;
  }
  users.push(newUser);
  res.send(users, "successfully created").status(201);
});
// ----------------------------- SWAGGER -----------------------------
/**
 * @swagger
 * /register:
 *   post:
 *     summary: yeni user yaradan api
 *     responses:
 *       201:
 *         description: Ugurlu
 */
// morgan("dev");
// ==================================================== LOGIN ==============================================================
router.post("/login/add", (req, res) => {
  const { name, surname, username, email, password, phone } = req.body;
  const currentUser = {
    id: uuidv4(),
    username: username,
    password: password,
  };
  // validation
  const result = loginSchema.validate(req.body);
  let error;
  if (result.error) {
    error = result.error.details[0].message;
    res.status(400).send(error);
    return;
  }
  // check compatibility
  let mainUser = users.find(
    (u) =>
      u.username === currentUser.username &&
      u.password === currentUser.password,
  );
  if (mainUser) {
    res.send("Login successfully");
  } else {
    res.send("User not found").status(400);
  }
});
/**
 * @swagger
 * /login:
 *   post:
 *     summary: ugurlu login
 *     responses:
 *       200:
 *         description: Ugurlu
 */
// ===================================================== GET ALL USERS ================================================
router.get("/login/all", (req, res) => {
  res.send(users);
});
/**
 * @swagger
 * /login:
 *   get:
 *     summary: butun register olmus istifadecileri getiren api
 *     responses:
 *       200:
 *         description: Ugurlu
 */
// ===================================================== GET A SPECIFIC USER ===========================================
router.get("/login/findOne/:id", (req, res) => {
  let specificUser = users.find((u) => u.id === req.params.id);
  if (!specificUser) {
    return res.send("User not found").status(404);
  }
  res.send(specificUser);
});
/**
 * @swagger
 * /login/id:
 *   get:
 *     summary: spesifik user datalarini getiren api
 *     responses:
 *       200:
 *         description: Ugurlu
 */
// =========================================== DELETE USER ============================================================
router.delete("/login/deleteUser/:id", (req, res) => {
  let mainUser = users.find((u) => u.id === req.params.id);
  if (!mainUser) {
    return res.send("User not found!").status(400);
  }
  let deletedPersonIndex = users.indexOf(mainUser);
  users.splice(deletedPersonIndex, 1);
  res.send(mainUser);
});
/**
 * @swagger
 * /login:
 *   delete:
 *     summary: spesifik istfadecini silen enpoint
 *     responses:
 *       200:
 *         description: Ugurlu
 */

export default router;
