const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const bookSchema = mongoose.Schema(
  {
    bookId: {
      type: Number,
      unique: true,
    },
    title: {
        type: String,
        required: true 
    },
    author: {
       type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    genre:{
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate a unique bookId
bookSchema.pre('save', async function (next) {
  const book = this;
  if (!book.bookId) {
    const lastBook = await mongoose.models.book.findOne().sort({ bookId: -1 });
    const lastBookId = lastBook ? lastBook.bookId : 0;
    book.bookId = lastBookId + 1;
  }
  next();
});

// add plugin that converts mongoose to json
bookSchema.plugin(toJSON);
bookSchema.plugin(paginate);

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
