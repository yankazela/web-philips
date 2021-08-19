
const app = require('../src/server')
const supertest = require('supertest')

const data = {
    "quantity": 45,
    "id": "test-yanncik-2",
    "price": 123,
    "name": "123"
}

test("POST success /api/get-product", () => {

    supertest(app).post("/api/add-product")
        .send(data)
        .expect(200)
        .then((response) => {
            // Check the response
            expect(typeof response.body).toBe('object');
            expect(response.body.quantity).toBe(data.quantity);
        })
})

test("GET product /api/get-product/{id}", () => {

    supertest(app).get("/api/get-product/test-yanncik-2")
        .send(data)
        .expect(200)
        .then((response) => {
            // Check the response
            expect(response.body).toBe(data);
        })
})

test("Delete product /api/delete-products", () => {

    supertest(app).get("/api/delete-product/test-yanncik-2")
        .send(data)
        .expect(200)
        .then((response) => {
            // Check the response
            expect(response.body).toBe("");
        })
})

