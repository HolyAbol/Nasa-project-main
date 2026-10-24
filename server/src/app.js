import express from "express"
import cors from "cors"
import { api } from "./routes/api.js";
import path from "path"
import { fileURLToPath } from "url";
import morgan from 'morgan'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

app.use(express.json())
app.use(cors({
    origin:'http://localhost:3000'
}))
app.use('/v1',api)
app.use(morgan('combined'))
app.use(express.static(path.join(__dirname,'..','public','build')));

export default app;