import Joi from "joi";

export const transactionSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(2)
        .max(100)
        .required(),

    amount: Joi.number()
        .positive()
        .required(),

    type: Joi.string()
        .valid("income", "expense")
        .required(),

    category: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),

    description: Joi.string()
        .trim()
        .allow("")
        .optional(),

    date: Joi.date()
        .optional(),
});