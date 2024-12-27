const Joi = require('joi');

// Schema for user registration validation
const registerSchema = Joi.object({
    firstName: Joi.string().max(50).required().messages({
        'string.empty': 'First name is required',
        'string.max': 'First name must be less than 50 characters',
    }),
    lastName: Joi.string().max(50).required().messages({
        'string.empty': 'Last name is required',
        'string.max': 'Last name must be less than 50 characters',
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Invalid email format',
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters long',
    }),
    phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .optional()
        .messages({
            'string.pattern.base': 'Phone number must be between 10 and 15 digits',
        }),
    registerNumber: Joi.string().required().messages({
        'string.empty': 'Register number is required',
    }),
    batch: Joi.number()
        .valid(24, 25, 26) // Add valid batch numbers here
        .required()
        .messages({
            'number.base': 'Batch must be a number',
            'any.only': 'Batch must be one of the predefined values (e.g., 24, 25, 26)',
            'any.required': 'Batch is required',
        }),
});

// Schema for user login validation
const loginSchema = Joi.object({
    identifier: Joi.string().required().messages({
        'string.empty': 'Identifier (email, regNo, or phone) is required',
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required',
    }),
});

// Function to validate registration data
const validateRegister = (data) => {
    return registerSchema.validate(data, { abortEarly: false });
};

// Function to validate login data
const validateLogin = (data) => {
    return loginSchema.validate(data, { abortEarly: false });
};

module.exports = { validateRegister, validateLogin };
