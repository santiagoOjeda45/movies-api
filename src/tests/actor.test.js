const request = require('supertest');
const app = require('../app');
require('../models');

let id;

test("GET /actors debe traer todos los actores", async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test("POST /actors debe crear un nuevo actor", async () => {
    const actor = {
        firstName: "Adam",
        lastName: "Driver",
        nationality: "American",
        image: "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcRE1nXf7zC4hap1dtP_VxuyuIvl_zuCG8FeRxU8gvF6gzgmBanTPXXJxGH0g5AE0w1e",
        birthday: "2001-05-26"
    };
    const res = await request(app).post('/actors').send(actor);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.firstName).toBe(actor.firstName);
});

test("PUT /actors/:id debe actualizar un actor", async () => {
    const actor = {
        birthday: "1983-11-19"
    }
    const res = await request(app).put(`/actors/${id}`).send(actor);
    expect(res.status).toBe(200);
    expect(res.body.birthday).toBe(actor.birthday);
});

test("DELETE /actors>/:id debe eliminar un actor", async () => {
    const res = await request(app).delete(`/actors/${id}`)
    expect(res.status).toBe(204);
});