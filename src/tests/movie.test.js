const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models');

let id;

test("GET /movies debe traer todas la peliculas", async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /movies debe crear una nueva pelicula", async () => {
    const movie = {
        name: "Rush",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjg-3uagn4V8J778EzuAi47d0DqpNXDH6jBafdWRd5wZ9A6K58",
        synopsis: "The charismatic Englishman James Hunt and the perfectionist Austrian Niki Lauda stood out on the Formula 1 scene of the seventies and shared an intense rivalry on and off the tracks.",
        releaseYear: 2013
    };
    const res = await request(app).post('/movies').send(movie);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(movie.name);
});

test("PUT /movies/:id debe actualizar una pelicula", async () => {
    const movie = {
        name: "Rush Updated"
    };
    const res = await request(app).put(`/movies/${id}`).send(movie);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(movie.name);
});

test("POST /movies/:id/actors debe insertar los actores de la pelicula", async () => {
    const movie = await Actor.create({
        firstName: "Mattew",
        lastName: "McConaughey",
        nationality: "American",
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSLPznpeQuhDUAOFB6QTuH6IBhfjhmHhLMNKqO8Ecos5N8vlbgt",
        birthday: "1969-11-04"
    });
    const res = await request(app).post(`/movies/${id}/actors`).send([movie.id]);
    await movie.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test("POST /movies/:id/directors debe insertar los directores de la pelicula", async () => {
    const director = await Director.create({
        firstName: "Christopher",
        lastName: "Nolan",
        nationality: "British-American",
        image: "https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQoNwZ9HSTyrGrvFEV8-yG0OPBjZgU4Qw3melKpEq_JbPg4T6NqSm5m2XqCWJ2mXo9R",
        birthday: "1970-07-30"
    });
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test("POST /movies/:id/genres debe insertar los generos de la pelicula", async () => {
    const genre = await Genre.create({
        name: "Horror"
    });
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test("DELETE /movies/:id debe eliminar una pelicula", async () => {
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
});