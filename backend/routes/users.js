const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const linkRule = require('../constants/link-rule');

const {
  getUsers,
  getUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');

// GET /users — возвращает всех пользователей
router.get('/', getUsers);

// GET /users/me - возвращает информацию о текущем пользователе
router.get('/me', getCurrentUser);

// GET /users/:userId - возвращает пользователя по _id
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

// PATCH /users/me — обновляет профиль
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

// PATCH /users/me/avatar — обновляет аватар
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(linkRule),
  }),
}), updateAvatar);

module.exports = router;
