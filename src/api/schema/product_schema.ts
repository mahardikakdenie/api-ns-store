import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        "string.base": "Product name should be a string",
        "string.empty": "Product name cannot be empty",
        "string.min": "Product name should have a minimum length of 3",
        "string.max": "Product name should have a maximum length of 50",
        "any.required": "Product name is required"
    }),
    userId: Joi.string().required().messages({
        "string.base": "User ID should be a string",
        "string.empty": "User ID cannot be empty",
        "any.required": "User ID is required"
    }),
    price: Joi.number().positive().precision(2).required().messages({
        "number.base": "Price should be a valid number",
        "number.positive": "Price should be a positive number",
        "number.precision": "Price should have at most 2 decimal places",
        "any.required": "Price is required"
    }),
    description: Joi.string().max(500).optional().messages({
        "string.base": "Description should be a string",
        "string.max": "Description should not exceed 500 characters"
    }),
    media: Joi.object().optional().messages({
        "object.base": "Media should be a valid object"
    }),
    category: Joi.string().valid('Electronics', 'Books', 'Clothing', 'Accessories', 'Other').required().messages({
        "any.only": "Category must be one of: Electronics, Books, Clothing, Accessories, or Other",
        "any.required": "Category is required"
    }),
    inStock: Joi.boolean().optional().default(true).messages({
        "boolean.base": "In stock must be a boolean value"
    })
});
