const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { bookService } = require('../services');

const createBook = catchAsync(async (req, res) => {
  const book = await bookService.createBook(req.body);
  res.status(httpStatus.CREATED).send(book);
});

const getBooks = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title', 'author']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await bookService.queryBooks(filter, options);
  res.send(result);
});

const getBook = catchAsync(async (req, res) => {
  const book = await bookService.getBookById(req.params.id);
  if (!book) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }
  res.send(book);
});

const updateBookById = catchAsync(async (req, res) => {
    const book = await bookService.updateBookById(req.params.id, req.body);
    res.send(book);
  });

  const deleteBookById = catchAsync(async (req, res) => {
    const book = await bookService.deleteBookById(req.params.id);
    res.send(book);
  });

module.exports = {
    createBook,
    getBooks,
    getBook,
    updateBookById,
    deleteBookById
};
