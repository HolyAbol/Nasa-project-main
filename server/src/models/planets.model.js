
import {parse} from "csv-parse"
import fs from "fs"
import path from "path"
import { dbPlanet } from "./planets.mongo.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isHabitable=(planet)=>{
    return (planet['koi_disposition']==='CONFIRMED'&& planet['koi_insol']> 0.36 &&
         planet['koi_insol']<1.11 && planet ['koi_prad'] <1.6
        )}
function LoadPlanets(){
    return new Promise((resolve,reject)=>{

        fs.createReadStream(path.join(__dirname,'.','kepler.csv')).pipe(
            parse({
                comment:'#',
                columns:true
            })
        )
        .on('data',async (data) =>{
            if(isHabitable(data)){
            savePlanets(data)
            }
        })
        .on('err',(err)=>{
            console.log(err)
        reject(err);
    })
        

        .on('end',async (planets)=>{
            const planetnames= (await getAllPlanets()).length; 
            console.log(`${planetnames} planets has been found`)
            resolve();
        })
      })
}
async function getAllPlanets(){
    return await dbPlanet.find({},{
        '_id':0,
        '__v':0
    });
}

    async function savePlanets(planet){
        try{
     await   dbPlanet.findOneAndUpdate({
                kepler_name:planet.kepler_name
             },{kepler_name:planet.kepler_name},{
                upsert:true
             })
}catch(err){
    console.log(`failed to save planets ${err}`)
}
                                       }

export {getAllPlanets,LoadPlanets}