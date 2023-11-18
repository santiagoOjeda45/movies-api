const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test("GET /genres debe traer todos los generos", async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /genres debe crear un nuevo genero", async () => {
    const genre = {
        name: "Action"
    };
    const res = await request(app).post('/genres').send(genre);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(genre.name);
});

test("PUT /genres/:id debe actualizart un genero", async () => {
    const genre = {
        name: "Action updated"
    };
    const res = await request(app).put(`/genres/${id}`).send(genre);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(genre.name);
});

test("DELETE /genres/:id debe eliminar un genero", async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204);
});