import app from "./app.js"
import http from "http";
import { connectionStatus,startDB } from "./services/mongo.js";
import {LoadPlanets} from "./models/planets.model.js"
import { loadLaunchData } from "./models/launches.model.js";
const PORT = process.env.port || 8080;
const server = http.createServer(app)

await connectionStatus()
await startDB()
await LoadPlanets()
await loadLaunchData()
server.listen(PORT,()=>{
    console.log(PORT)
})