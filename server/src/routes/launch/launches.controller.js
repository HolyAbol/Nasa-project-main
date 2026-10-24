
import { getAllLaunches ,existLaunchWithId, abortlaunchWithId, scheduleNewLaunch}from "../../models/launches.model.js";
import { getPagination } from "../../services/query.js";
async function HttpgetAllLaunches(req,res){
    const {skip,limit}=getPagination(req.query)
    return res.status(200).json (await getAllLaunches(skip,limit))
}
async function httpaddNewlaunch(req,res){
    const launch=req.body
    if (!req.body.mission ||!req.body.rocket ||!req.body.launchDate ||!req.body.destination){
        return res.status(400).json({
            error:'missing required launch property'
        })
    }
   
    launch.launchDate = new Date(launch.launchDate)
    if(isNaN(launch.launchDate)){
        return res.status(400).json({
            error:"invalid date"
        })
    }
await scheduleNewLaunch(launch)
res.status(201).json(launch)
}
function httpAbortLaunch(req,res){
    const launchId =Number(req.params.id)
    const existLaunch = existLaunchWithId(launchId)
    if(!existLaunch){
        return res.status(400).json("error")
    }
   const aborted = abortlaunchWithId(launchId);
   if(!aborted){
    res.status(400).json({
        error:"launch was not aborted"
    })
   }
return res.status(200).json({
    ok:true
})
}
export{HttpgetAllLaunches,httpaddNewlaunch,httpAbortLaunch}