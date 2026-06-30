import userSchema from "../validators/register-schema.js";
import loginSchema from "../validators/login-schema.js";
import incomeSchema from "../validators/income-schema.js";

export function validateUserData(req, res, next) {
  //  validation
  const result = userSchema.validate(req.body);
  let error;
  if (result.error) {
    error = result.error.details[0].message;
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
export function validateUserIncome(req, res, next) {
  //  validation
  const result = incomeSchema.validate(req.body);
  let error;
  if (result.error) {
    error = result.error.details[0].message;
  }
  next();
};