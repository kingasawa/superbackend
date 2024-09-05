const Joi = require('joi');
const { validateEncryptedMemberId } = require('./user');

const validate = {
  getCoupon: (payload) => {
    const data = Joi.object({
      u: Joi.string()
            .required()
            .custom(validateEncryptedMemberId),
      c: Joi.string().required(),
    });

    return data.validate(payload, {
      allowUnknown: false,
    });
  },
  getShopInfo: (payload) => {
    const data = Joi.object({
      c: Joi.string().required(),
    });

    return data.validate(payload, {
      allowUnknown: false,
    });
  },
  applyCoupon: (payload) => {
    const data = Joi.object({
      u: Joi.string()
            .required()
            .custom(validateEncryptedMemberId),
      c: Joi.string().required(),
      s: Joi.string().required(),
    });

    return data.validate(payload, {
      allowUnknown: false,
    });
  },
};

module.exports = validate;
