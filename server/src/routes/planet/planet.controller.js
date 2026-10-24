import { getAllPlanets } from "../../models/planets.model.js"

async function httpGetAllPlanets(req,res){
    return res.status(200).json(await getAllPlanets
   (planet => ({
    kepler_name: planet.kepler_name,
  })))

}
export {
  httpGetAllPlanets
};