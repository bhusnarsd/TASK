const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBook = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    author: Joi.string().required(),
    year: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
    genre: Joi.string().optional(),
  }),
};

const getBooks = {
  query: Joi.object().keys({
    title: Joi.string(),
    author: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getBook = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};


const updateBook = {
    params: Joi.object().keys({
      id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
      .keys({
        bookId: Joi.number(),
        id: Joi.required().custom(objectId),
        title: Joi.string().optional(),
        author: Joi.string().optional(),
        year: Joi.number().integer().min(1000).max(new Date().getFullYear()).optional(),
        genre: Joi.string().optional(),
      })
  };

  const deleteBook = {
    params: Joi.object().keys({
      id: Joi.string().custom(objectId),
    }),
  };

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};
