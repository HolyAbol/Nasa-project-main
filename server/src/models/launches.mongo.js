import mongoose from "mongoose";
const Db=mongoose
const launchesSchema = new mongoose.Schema({
    flightNumber:{
        type:Number,
        default:100,
        required:true,
        min:100,
        max:999
    },
    launchDate:{
        type: Date,
        required:true
    },
    mission:{
        type:String,
        required:true
    },
    rocket:{
        type:String,
        required:true
    },
    destination:{
        type:String,
        required:true
    },
    customer:[String],
    
    upcoming:{
        type:Boolean,
        
    },
    success:{
     type:Boolean,
     required:true,
     default:true
    }

    
})
const dblaunches =mongoose.model('launch',launchesSchema)
export {dblaunches}