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

// POST /movies — создаёт карточку
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(linkRule),
  }),
}), createMovie);

// DELETE /movies/:movieId — удаляет карточку по идентификатору
router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

// PUT /movies/:movieId/likes — поставить лайк карточке
router.put('/:movieId/likes', celebrate({
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
