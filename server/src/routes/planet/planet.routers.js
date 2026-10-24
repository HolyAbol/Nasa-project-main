import express from "express"
import { httpGetAllPlanets } from "./planet.controller.js"
const planetRouter = express.Router()
planetRouter.get("/",httpGetAllPlanets)

export {planetRouter}