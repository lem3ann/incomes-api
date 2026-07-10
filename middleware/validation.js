import userSchema from "../validators/register-schema.js";
import loginSchema from "../validators/login-schema.js";
import incomeSchema from "../validators/income-schema.js";

export async function validateUserData(req, res, next) {
  //  validation
  try {
    const result = await userSchema.validateAsync(req.body);

    console.log("req.body", req.body);
    console.log("result", result);

    next();
  } catch (error) {
    if (error) {
      res.status(400).send({
        message: error.details[0].message,
      });
    }
  }
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
    const { error } = incomeSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
}
