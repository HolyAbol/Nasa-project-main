import express from 'express'
const api = express.Router()

import { planetRouter } from "./planet/planet.routers.js"
import { launchRouter } from "./launch/launches.router.js"

api.use('/api/launches',launchRouter)
api.use('/api/planets',planetRouter)

         export {api}