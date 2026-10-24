import mongoose from "mongoose";
const my_url = "mongodb://ADMIN:ABOLFAZL546@127.0.0.1:27017/myDatabase?authSource=admin"
const db =mongoose
async function connectionStatus()
{
    mongoose.connection.once('connected',()=>
        {
            console.log("connected!")
        })
            mongoose.connection.on('disconnected',(err)=>
                {
                console.error(err)
                })
}


     async function startDB()
 { 
            try 
    {
            await db.connect((my_url),
            {
                serverSelectionTimeoutMS:5000
            }) 
     }
        catch(err)
        {
        console.error(err)
        }
  }
                                export{startDB,my_url,connectionStatus}