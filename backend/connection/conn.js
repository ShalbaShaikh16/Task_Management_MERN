const mongoose=require("mongoose");
const conn=async()=>{
    try{
        const response=await mongoose.connect(`${process.env.MONGO_URI}`);
        if(response){
            console.log("Connected To Database!");
        }  
    }
    catch(error){
        console.log("error")
        
    }
};
conn();