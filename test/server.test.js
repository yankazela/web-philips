
const app =  require('../src/server')
const mockData = require('./mockData')
const mongoose = require('mongoose')
const Records = require('../src/model/record')
const supertest  = require('supertest')

const mongoUrl = "mongodb://localhost:27017/JestDB"

beforeAll((done) => {
    mongoose.connect(mongoUrl,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
            Records.insertMany(mockData)
            done()
    })
})

afterAll((done) => {
    mongoose.connect(mongoUrl,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => {
            mongoose.connection.db.dropDatabase(() => {
            mongoose.connection.close(() => done())
            })
        })
})

test("POST success /api/get-records", () => {
    const data = { 
        startDate: "2000-01-01",
        endDate: "2021-12-30",
        minCount: 0,
        maxCount: 100
    }

    supertest(app).post("/api/get-records")
        .send(data)
        .expect(200)
        .then((response) => {
            // Check the response
            expect(response.body.code).toBe(0);
            expect(response.body.msg).toBe('Success');
            expect(response.body.records[0].key).toBe('hQAKOlkHL')
        })
})

test("POST failed /api/get-records", () => {
    const data = { 
        startDate: "2000-01-01",
        endDate: "2021-12-30",
    }

    supertest(app).post("/api/get-records")
        .send(data)
        .expect(403)
        .then((response) => {
            // Check the response
            expect(response.body.code).toBe(1);
            expect(response.body.msg).toBe('Failure');
            expect(response.body.errors.length).toBe(3)
        })
})

