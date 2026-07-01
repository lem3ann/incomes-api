import Joi from "joi";
// ===================================================   JOI SCHEMA ==============================================
const userSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }),
  name: Joi.string().alphanum().min(3).max(35).required(),
  surname: Joi.string().alphanum().min(3).max(35).required(),
  username: Joi.string().alphanum().min(3).max(35).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().min(9).required(),
  password: Joi.string().min(8).required(),
});

export default userSchema;
