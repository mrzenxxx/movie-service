const Movie = require('../models/movies');

const SomeWentWrongError = require('../errors/something-went-wrong-err');
const NotFoundError = require('../errors/not-found-err');
const AccessDeniedError = require('../errors/access-denied-err');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner', 'likes'])
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { name, link } = req.body;

  Movie.create({
    name, link, owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new SomeWentWrongError('Некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((movie) => {
      // Проверка прав на удаление карточки
      if (req.user._id !== movie.owner.toString()) {
        throw new AccessDeniedError('Вы не являетесь создателем данной карточки');
      }

      return Movie.findByIdAndRemove(req.params.movieId)
        .then((deleteMovie) => res.send(deleteMovie));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new SomeWentWrongError('Некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports.likeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Некорректный id');
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new SomeWentWrongError('Некорректный id'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeMovie = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((newMovie) => res.send(newMovie))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new SomeWentWrongError('Некорректный id'));
      } else {
        next(err);
      }
    });
};
