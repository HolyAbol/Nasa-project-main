import mongoose from "mongoose";
const planetschema = new  mongoose.Schema({
    keple_name:{
        type:String,
        required:true,
        unique:true
},
})

const dbPlanet = mongoose.model('planet',planetschema)
export{dbPlanet}