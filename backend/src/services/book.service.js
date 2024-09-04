
const httpStatus = require('http-status');
const {Book} = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a Book
 * @param {Object} reqBody
 * @returns {Promise<User>}
 */
const createBook =  async (reqBody) => {
    return Book.create(reqBody);
}

/**
 * Query for book
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBooks = async (filter, options) => {
  const books = await Book.paginate(filter, options);
  return books;
};


/**
 * Get book by id
 * @param {ObjectId} id
 * @returns {Promise<Book>}
 */
const getBookById =  async(id) => {
  const books = await Book.findById(id);
  return books
}

/**
 * Update book by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Book>}
 */
const updateBookById = async (id, updateBody) => {
  const book = await Book.findByIdAndUpdate(id, updateBody, { new: true, runValidators: true });
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  return book;
};

/**
 * Delete book by id
 * @param {ObjectId} id
 * @returns {Promise<Book>}
 */
const deleteBookById = async (id) => {
  const book = await Book.findByIdAndDelete(id);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  return book;
};


module.exports = {
  createBook,
  queryBooks,
  getBookById,
  deleteBookById,
  updateBookById,
};
