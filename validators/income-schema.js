import Joi from "joi";

const incomeSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(35).required(),
    amount: Joi.number().positive().required(),
    userId: Joi.string()
});
export default incomeSchema;