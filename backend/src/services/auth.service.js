const httpStatus = require('http-status');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');


/**
 * Create a User
 * @param {Object} reqBody
 * @returns {Promise<User>}
*/
const createUser = async (reqBody) => {
  return User.create(reqBody);
};
/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};
/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

module.exports = {
  createUser,
  loginUserWithEmailAndPassword,
};
