import { json } from "express";
import app from "../../app.js";
import request from 'supertest'
import { startDB } from "../../services/mongo.js";

describe('launches API',()=>{
    beforeAll(()=>{
        startDB()
    })
    describe('TEST GEt /launches',()=>{
    test('it shoud response with 200 status',async ()=>{
        const res= await request(app).get('/v1/api/launches')
        expect(res.statusCode).toBe(200);
    })
})

const fd = {
            mission:"balls",
            destination:"Kepler-1652 b",
            rocket:"piazi",
            launchDate:'jan 3,2090'
    }
    const fdw={
        mission:"balls",
            destination:"Kepler-1652 b",
            rocket:"piazi",
    }
describe('TEST POST /launches',()=>{
    test('it should respond with a 200',async ()=>{
        const res = await request(app).post('/v1/api/launches')
        .send(fd)
        .expect(201)
        .expect('Content-Type',/json/)
    expect(res.body).toMatchObject(fdw)
    const fdt = new Date(fd.launchDate).valueOf();
    const fdwt= new Date(res.body.launchDate).valueOf();
    expect(fdt).toBe(fdwt);

    })

    test('it should catch missing required properties',async()=>{
        const res = await request(app).post('/v1/api/launches')
        .send(fdw)
    .expect(400)
    .expect('Content-Type',/json/)
    expect(res.body).toStrictEqual({
        error:'missing required launch property'
    })

    })
const fdwi ={
        mission:"balls",
            destination:"Kepler-1652 b",
            rocket:"piazi",
    launchDate:"balls"
    }
    test('it should catch invalid date',async()=>{
        const res = await request(app).post('/v1/api/launches')
        .send(fdwi)
    .expect(400)
    .expect('Content-Type',/json/)
    expect(res.body).toStrictEqual({
        error:"invalid date"
    })
    

    })
})


})

