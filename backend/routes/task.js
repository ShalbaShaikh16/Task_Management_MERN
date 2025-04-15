const router =require("express").Router();
const Task=require("../models/task");
const User = require("../models/user");
const{authenticateToken}=require("../routes/auth")

//create-task-api
router.post("/create-task",authenticateToken,async(req,res)=>{
    try{
      const{title,desc}=req.body;
      const {id}=req.headers;
      const newTask=new Task({title:title,desc:desc});
      const saveTask = await newTask.save();
    const taskId=saveTask._id;
    await User.findByIdAndUpdate(id,{$push:{tasks:taskId._id}});
    res.status(200).json({message:"Task Created Successfully"});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:"Internal Server Error"})
    }
})

//Get all Task-api
router.get("/get-all-task",authenticateToken,async(req,res)=>{
  try{
    const {id}=req.headers;
    const userData= await User.findById(id).populate({path:"tasks",options:{sort:{createdAt:1}}});
    res.status(200).json({data:userData});

  }
  catch(err){
    console.log(err);
    res.status(400).json({message:"Internal Server Error"})
}
});

//Delete task-api
router.delete("/delete-task/:id",authenticateToken,async(req,res)=>{
  try{
    const {id}=req.params;
    const userId =req.headers.id;
    await Task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId,{$pull:{tasks:id}});
    res.status(200).json({message:"Task deleted successfully"});

  }
  catch(err){
    console.log(err);
    res.status(400).json({message:"Internal Server Error"})
}
});

//Update Tasks-api
router.put("/update-task/:id",authenticateToken,async(req,res)=>{
  try{
    const {id}=req.params;
    const {title,desc}=req.body;
    await Task.findByIdAndUpdate(id,{title:title,desc:desc});
    res.status(200).json({message:"Task Updated successfully"});

  }
  catch(err){
    console.log(err);
    res.status(400).json({message:"Internal Server Error"})
}
});

//Update Important Task-api
router.put("/update-Imp-task/:id",authenticateToken,async(req,res)=>{
  try{
    const {id}=req.params;
   const TaskData=await Task.findById(id);
   const ImpTask= TaskData.important; 
    await Task.findByIdAndUpdate(id,{important:!ImpTask});
    res.status(200).json({message:"Task Updated successfully"});

  }
  catch(err){
    console.log(err);
    res.status(400).json({message:"Internal Server Error"})
}
});

//Complete Task-api

router.put("/update-Comp-task/:id",authenticateToken,async(req,res)=>{
  try{
    const {id}=req.params;
   const TaskData=await Task.findById(id);
   const CompTask= TaskData.complete; 
    await Task.findByIdAndUpdate(id,{complete:!CompTask});
    res.status(200).json({message:"Task Updated successfully"});

  }
  catch(err){
    console.log(err);
    res.status(400).json({message:"Internal Server Error"})
}
});


//get-important task
router.get("/get-imp-task",authenticateToken,async(req,res)=>{
  try{
    const {id}=req.headers;
    const Data= await User.findById(id).populate({path:"tasks",match:{important:true} ,  options:{sort:{createdAt:1}}});
    const ImpTaskData=Data.tasks;
    res.status(200).json({data:ImpTaskData});

  }
  catch(err){
    console.log(err);
    res.status(400).json({message:"Internal Server Error"})
}
});

//get-Completed-api

router.get("/get-comp-task",authenticateToken,async(req,res)=>{
  try{
    const {id}=req.headers;
    const Data= await User.findById(id).populate({path:"tasks",match:{complete:true} ,  options:{sort:{createdAt:1}}});
    const CompTaskData=Data.tasks;
    res.status(200).json({data:CompTaskData});

  }
  catch(err){
    console.log(err);
    res.status(400).json({message:"Internal Server Error"})
}
});

//get incomplete task

router.get("/get-incomp-task",authenticateToken,async(req,res)=>{
  try{
    const {id}=req.headers;
    const Data= await User.findById(id).populate({path:"tasks",match:{complete:false} ,  options:{sort:{createdAt:1}}});
    const CompTaskData=Data.tasks;
    res.status(200).json({data:CompTaskData});

  }
  catch(err){
    console.log(err);
    res.status(400).json({message:"Internal Server Error"})
}
});
module.exports=router;