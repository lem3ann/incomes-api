import Joi from "joi";
// ===================================================   JOI SCHEMA ==============================================
const loginSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(35).required(),
  password: Joi.string().min(8).required(),
});
export default loginSchema;
