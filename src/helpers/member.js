
const crypto = require('crypto');
const {
  CIPHER_MODE, CIPHER_KEY, CIPHER_IV,
  AUTH_CIPHER_MODE, AUTH_CIPHER_KEY, AUTH_CIPHER_IV,
  CIPHER_KEY_NEW, CIPHER_IV_NEW
} = require('../config/config').config;

/**
 * Check Encrypted Cainz Member ID
 *
 * @param {string} value
 * @param {*} helpers
 */
const validateEncryptedMemberId = (value, helpers) => {
  const decryptedValue = decryptMemberId(value);

  if (!decryptedValue || !checkMemberId(decryptedValue)) {
    return helpers.error('any.invalid');
  } else {
    return value;
  }
};

/**
 * Check Decrypted Cainz Member ID
 *
 * @param {string} value
 * @param {*} helpers
 */
const validateDecryptedMemberId = (value, helpers) => {

  const isExistsSpace = /\s/g.test(value);
  const valueFinal = isExistsSpace ? value.replace(/\s+/g, '') : value;

  if (!checkMemberId(valueFinal)) {
    return helpers.error('any.invalid');
  } else {
    return valueFinal;
  }
};

/**
 * Validate Cainz member ID
 *
 * @param {string} memberId
 * @return {boolean} return
 */
const checkMemberId = (memberId) => {
  const check = (memberId.substr(0, 2) == '27') && (memberId.length == 13);
  if (!check) return false;

  const matches = stringToArray(memberId);
  if (check && typeof matches[1] !== 'undefined' && typeof matches[2] !== 'undefined') {
    const lastId = memberId.substr(-1);
    const sum = sumArray(matches[2]) * 3 + sumArray(matches[1]);
    const lastCSum = parseInt(sum.toString().substr(-1));
    const calCheck = (10 - lastCSum).toString().substr(-1);
    return (calCheck == lastId);
  } else {
    return false;
  }
}

/**
 * Decrypt Cainz Member ID
 *
 * @param {string} raw
 * @return {string} decrypted value
 */
function decryptMemberId(raw) {
  try {
    const decipher = crypto.createDecipheriv(CIPHER_MODE, CIPHER_KEY, CIPHER_IV);
    const decrypted = decipher.update(raw, 'base64', 'utf8');
    return decrypted + decipher.final('utf8');
  } catch (error) {
    return null;
  }
}

/**
 * Encrypt Cainz Member ID
 *
 * @param {string} memberId
 * @return {string} encrypted value
 */
function encryptMemberId(memberId) {
  try {
    const cipher = crypto.createCipheriv(CIPHER_MODE, CIPHER_KEY, CIPHER_IV);
    const encrypted = cipher.update(memberId, 'utf8', 'base64');
    return encrypted + cipher.final('base64');
  } catch (error) {
    return null;
  }
}


/**
 * Decrypt Login Auth
 *
 * @param {string} a
 * @return {string} encrypted value
 */
function decryptLoginAuth(raw) {
  try {
    const decipher = crypto.createDecipheriv(AUTH_CIPHER_MODE, AUTH_CIPHER_KEY, AUTH_CIPHER_IV);
    const decrypted = decipher.update(decodeURIComponent(raw), 'base64', 'utf8');
    return decrypted + decipher.final('utf8');
  } catch (error) {
    return null;
  }
}

function checkValidAuth(member_id, auth_key) {
  const splitMemberId = member_id.split('=').filter(item => item);
  const splitAuthKey = auth_key.split('=').filter(item => item);
  if (splitMemberId.length > 1 || splitAuthKey.length > 1) {
    return false
  }
  try {
    const validAuthKey = decryptLoginAuth(decodeURIComponent(auth_key));
    const cainzNumber = auth_key ? decryptMemberId(decodeURIComponent(member_id)) : decryptMemberIdNewKey(decodeURIComponent(member_id))
    const validMemberId = 'cainz_shop_dogrun' + cainzNumber;
    return {cainzNumber: cainzNumber, isValid: (auth_key ? validAuthKey === validMemberId : true)} 
  } catch(e) {
    return false
  }
}

/**
 * Parse the Member ID to array follow by defined regex pattern
 *
 * @param {string} data
 * @return {array} result
 */
const stringToArray = (data) => {
  var baseRegex = /(\w)(\w)/;
  var fullRegex = new RegExp(baseRegex, 'g');
  const fullMatches = data.match(fullRegex);

  var result = new Array(3);
  var firstEleArray = new Array();
  var lastEleArray = new Array();

  fullMatches.forEach(function (ele) {
    firstEleArray.push(ele.substr(0, 1));
    lastEleArray.push(ele.substr(-1));
  })

  result[0] = fullMatches;
  result[1] = firstEleArray;
  result[2] = lastEleArray;

  return result;
}

/**
 * Calculate total of number values from the input array
 *
 * @param {array} array
 * @return {int} total
 */
const sumArray = (array) => {
  var total = 0;
  array.forEach((function (ele) {
    total += parseInt(ele);
  }));
  return total;
}

/**
 * Decrypt New Cainz Member ID
 *
 * @param {string} raw
 * @return {string} decrypted value
 */
function decryptMemberIdNewKey(raw) {
  try {
    const decipher = crypto.createDecipheriv(CIPHER_MODE, CIPHER_KEY_NEW, CIPHER_IV_NEW);
    const decrypted = decipher.update(raw, 'base64', 'utf8');
    return decrypted + decipher.final('utf8');
  } catch (error) {
    return null;
  }
}

const decodeURIMemberId = decodeURIComponent;

const normalizeMemberId = (id) => encodeURIComponent(decodeURIComponent(id));

module.exports = {
  validateEncryptedMemberId,
  validateDecryptedMemberId,
  decryptMemberId,
  encryptMemberId,
  decodeURIMemberId,
  normalizeMemberId,
  checkValidAuth,
  decryptMemberIdNewKey
}
