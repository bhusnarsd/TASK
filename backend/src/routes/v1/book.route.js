const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { bookValidation } = require('../../validations');
const { bookController } = require('../../controllers');

const router = express.Router();
router
  .route('/')
  .post(auth(), validate(bookValidation.createBook), bookController.createBook)
  .get(auth(), validate(bookValidation.getBooks), bookController.getBooks);

router
  .route('/:id')
  .get(auth(), validate(bookValidation.getBook), bookController.getBook)
  .put(auth(), validate(bookValidation.updateBook), bookController.updateBookById)
  .delete(auth(), validate(bookValidation.deleteBook), bookController.deleteBookById);

module.exports = router;