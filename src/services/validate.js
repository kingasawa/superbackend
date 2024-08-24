const Joi = require('joi');
const {
  validateEncryptedMemberId,
  validateDecryptedMemberId,
} = require('../helpers/member');

const validate = {

  createOrder: (payload) => {
    const createOrder = Joi.object({
      cainz_card_number: Joi.string().required(),
      dogrun_number: Joi.string().required().regex(/^dr-[0-9]{7}$/),
      order_start_time: Joi.string().required().regex(/^[0-9]{1,14}$/),
      pets_id: Joi.string()
        .required()
        .custom((value, helpers) => {
          const pets = value.split(',')
          const regex = new RegExp(/^[a-zA-Z0-9]{1,18}$/);
          const invalid = []
          pets.map(pet => {
            if (!regex.test(pet)) {
              invalid.push(pet)
            }
          })
          if (invalid.length > 0) {
            return helpers.error('any.invalid');
          } else {
            return value;
          }
        })
    })
    return createOrder.validate(payload)
  },

  cancelOrder: (payload) => {
    const cancelOrder = Joi.object({
      cainz_card_number: Joi.string().required(),
      order_sfid: Joi.string().required()
    })
    return cancelOrder.validate(payload)
  },

  getOrderInfo: (payload) => {
    const getOrderInfo = Joi.object({
      cainz_card_number: Joi.string().required()
    })
    return getOrderInfo.validate(payload)
  },

  checkRegistration: (payload) => {
    const checkRegistration = Joi.object({
      cainz_card_number: Joi.string().required()
    })
    return checkRegistration.validate(payload)
  },

  getOrderSituation: (payload) => {
    const getOrderSituation = Joi.object({
      store_code: Joi.string()
        .required()
        .regex(/^[0-9]{1,4}$/),
      dogrun_shop_cd: Joi.string().regex(/^dr-[0-9]{7}$/)
    })
    return getOrderSituation.validate(payload)
  },

  checkMemberId: (payload) => {
    const checkMemberId = Joi.object({
      cainz_card_number: Joi.string()
        .required()
        .custom(validateDecryptedMemberId, 'custom validation')
    })
    return checkMemberId.validate(payload)
  },

  checkLoginAuth: (payload) => {
    const checkLoginAuth = Joi.object({
      auth_key: Joi.string().allow('', null),
      member_id: Joi.string()
        .required()
    })
    return checkLoginAuth.validate(payload)
  },

  decryptMemberId: (payload) => {
    const decryptMemberId = Joi.object({
      cainz_card_number: Joi.string()
        .required().custom(validateEncryptedMemberId, 'custom validation'),
    })
    return decryptMemberId.validate(payload)
  }
}

module.exports = validate
