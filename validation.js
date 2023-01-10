const Joi = require("@hapi/joi");
// Validation with hapi and joi
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });

    const validate = schema.validate(data)
    return validate
}

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
    });

    const validate = schema.validate(data)
    return validate
}

const postValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(255).required(),
        description: Joi.string().max(1024).min(10).required(),
        author: Joi.string().max(255).min(2).required()
    })
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postValidation = postValidation;

