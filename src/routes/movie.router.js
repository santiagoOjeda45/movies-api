const { getAll, create, getOne, remove, update, setActorMovies, setDirectorMovies, setGenreMovies } = require('../controllers/movie.controllers');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/:id/actors')
    .post(setActorMovies);

movieRouter.route('/:id/directors')
    .post(setDirectorMovies)

movieRouter.route('/:id/genres')
    .post(setGenreMovies)

module.exports = movieRouter;