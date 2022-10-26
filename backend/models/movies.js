const mongoose = require('mongoose');
const validator = require('validator');

const MovieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },

  director: {
    type: String,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  year: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
  },

  trailerLink: {
    type: String,
    required: true,
  },

  thumbnail: {
    type: String,
    required: true,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  movieId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },

  nameRU: {
    type: String,
    required: true,
  },

  nameEN: {
    type: String,
    required: true,
  },

});

MovieSchema.path('image').validate((link) => validator.isURL(link), 'Некорректный URL');
MovieSchema.path('thumbnail').validate((link) => validator.isURL(link), 'Некорректный URL');
MovieSchema.path('trailerLink').validate((link) => validator.isURL(link), 'Укажите ссылку на фильм');

// eslint-disable-next-line new-cap
module.exports = new mongoose.model('movie', MovieSchema);
