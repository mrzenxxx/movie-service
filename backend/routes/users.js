const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  updateProfile,
} = require('../controllers/users');

router.get('/users/me', celebrate({
  params: Joi.object().keys({
    // ЧТО ЗДЕСЬ ПИСАТЬ?
    user: Joi.string().length(32).hex().required(),
  }),
}),
getUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().min(2).max(30),
  }),
}), updateProfile);

module.exports = router;
