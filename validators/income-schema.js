import Joi from "joi";

const incomeSchema = Joi.object({
  name: Joi.string().alphanum().min(3).max(35).required(),
  amount: Joi.number().positive().required().allow(0),
  userId: Joi.string().guid({ version: "uuidv4" }),
  username: Joi.string(),
});
export default incomeSchema;
