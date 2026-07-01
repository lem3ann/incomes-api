import userSchema from "../validators/register-schema.js";
import loginSchema from "../validators/login-schema.js";
import incomeSchema from "../validators/income-schema.js";

export function validateUserData(req, res, next) {
  //  validation
  const result = userSchema.validate(req.body);
  let error;
  if (result.error) {
    error = result.error.details[0].message;
    res.status(400).send({
      error
    });
  }
  next();
}
// -----------------------------------------------LOGIN ----------------------------------------------
export function validateUserLogin(req, res, next) {
  //  validation
  const result = loginSchema.validate(req.body);
  let error;
  if (result.error) {
    error = result.error.details[0].message;
  }
  next();
}
// ------------------------------------------- INCOME --------------------------------------------------
export function validateUserIncome(err, req, res, next) {
  //  validation
  try {
    const {
      error
    } = incomeSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}