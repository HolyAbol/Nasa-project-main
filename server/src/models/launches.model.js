import axios from 'axios';
import { dblaunches } from "./launches.mongo.js";
import { dbPlanet } from "./planets.mongo.js";
let defaultFlightNumber= 100;

    async function getAllLaunches(skip,limit)
    {
         return await dblaunches.find
         ({},
          {
            '_id':0,'__v':0
          }
        ).sort({
          flightNumber: 1
        })
        .skip(skip)
        .limit(limit);
        
    }
    async function saveLaunch(launch)
    {
  try
      {
      
            await dblaunches.findOneAndUpdate
            (
               {
                  flightNumber:launch.flightNumber
              },
              launch
               ,
               {
                  upsert:true
               }
            )
      }
      catch(err)
       {
         console.log(err)
       }
   }
   async function getLatestFlightNumber (){
    const launchesNumber = await dblaunches.findOne().sort('-flightNumber')
    if(!launchesNumber){
      return defaultFlightNumber;
    }
    return launchesNumber.flightNumber;
   }
async function loadLaunchData(){
 const firstLaunch = await findLaunch({
    flightNumber:1
  })
  if(firstLaunch){
    console.log('launches already loaded')
  } 
  await getLAunchesFromApi()
}

async function scheduleNewLaunch(launch) {
  const planet_name= await dbPlanet.findOne
    (
        {
        keplerName:launch.destination
        }
      )
        if(!planet_name)
          {
          throw new Error('no matching planet')
          }
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = {
    ...launch,
    flightNumber: newFlightNumber,
    customer: ["mohsen", "bros"],
    success: true,
    upcoming: true,
  };

  await saveLaunch(newLaunch);
  console.log(launch)
}
async function getLAunchesFromApi() {
  console.log('downloading')
  const SPACE_X_URL = 'https://api.spacexdata.com/v4/launches/query'
 const response= await axios.post(SPACE_X_URL,{
    query:{},
    options:{
      pagination:0,
      populate:[{
        path:'rocket',
           select:{
          name:1
           }
      },
    {
      path:'payloads',
      select:{
        customers:1
      }
    }]
    }
  })
  const apiResponses = response.data.docs
  for(const response of apiResponses){
    const payloads = response['payloads']
    const customer = payloads.flatMap((payload)=>{
      return payload['customers']

    })
    const apiLaunch={
      flightNumber:response['flight_number'],
      mission:response['name'],
      rocket:response['rocket']['name'],
      launchDate:response['date_local'],
      upcoming:response['upcoming'],
      success:response['success'],
      customer:customer
    } 
    if(!response.statuscode===200){
      console.log('download failed')
    }
  await saveLaunch(apiLaunch);
  }

  
}
async function findLaunch(filter){
  return await dblaunches.findOne(filter)
}

async function existLaunchWithId(launchId){
return await findLaunch({
  flightNumber:launchId
})
}
async function abortlaunchWithId(launchId){
 const aborted = await dblaunches.updateOne({flightNumber:launchId},{
    success:false,
    upcoming:false
  })
  return aborted.ok=== 1 && aborted.nModified===1;
    
}
export {
    getAllLaunches,existLaunchWithId,abortlaunchWithId,saveLaunch,scheduleNewLaunch,loadLaunchData
}