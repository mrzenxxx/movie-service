const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const linkRule = require('../constants/link-rule');

const {
  getMovies,
  createMovie,
  deleteMovie,
  likeMovie,
  dislikeMovie,
} = require('../controllers/movies');

// GET /movies — возвращает все фильмы
router.get('/', getMovies);

// POST /movies — создаёт фильм
router.post('/', celebrate({
  body: Joi.object().keys({
    nameEN: Joi.string().required().min(2).max(30),
    nameRU: Joi.string().required().min(2).max(30),
    country: Joi.string().required().min(2).max(20),
    duration: Joi.number().required().min(1).max(11111111),
    year: Joi.number().required().min(1900).max(2022),
    description: Joi.string().required().min(2).max(3333),
    image: Joi.string().required().min(2).max(222),
    trailerLink: Joi.string().required().min(2).max(222),
    thumbnail: Joi.string().required().min(2).max(222),
  }),
}), createMovie);

// DELETE /movies/:movieId — удаляет фильм по идентификатору
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

// PUT /movies/:movieId/likes — поставить лайк карточке
router.put('/:movieId/saved', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), likeMovie);

// DELETE /movies/:movieId/likes — убрать лайк с карточки
router.delete('/:movieId/likes', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), dislikeMovie);

module.exports = router;
