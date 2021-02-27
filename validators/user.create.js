const Joi = require('joi');


module.exports = function(user) {
    const schema = Joi.object({
        firstName: Joi.string().required().min(3).max(100),
        lastName: Joi.string().required().min(3).max(100),
        username: Joi.string().required().min(5).max(100),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).max(16),
    });

    return schema.validate().error;
};
