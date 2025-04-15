const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt=require("jsonwebtoken");
//Sign-in
router.post ("/sign-in", async (req,res)=>{
    try{
    const{username}=req.body;
    const{email}=req.body;
    const existingUser=await User.findOne({username:username});
    const existingEmail=await User.findOne({email:email});
    if(existingUser){
        return res.status(400).json({message:"Username already exists"});
    }
    else if(username.length<4){
        return res.status(400).json({message:"Username should have atleast 4 characters"});
    }
    if(existingEmail){
        return  res.status(400).json({message:"Email already Exists"});
    }
    const hashPass= await bcrypt.hash(req.body.password,10);

    const newUser =new User({
        username:req.body.username,
        email:req.body.email,
        password:hashPass,
    });
    await newUser.save();
    return res.status(200).json({message:"Sign-in Successfully"});
    }
    catch(error){
        console.log(error);
        res.status(400).json({message:"Internal Server Error"})
    }
});

//Login

router.post("/log-in",async(req,res)=>{
    const{username,password}=req.body;
    const existingUser=await User.findOne({username:username});
    if(!existingUser){
        return res.status(400).json({message:"Invalid Credentials"});
    }
    bcrypt.compare(password,existingUser.password,(err,data)=>{
        if(data){
        const authClaims=[{name:username},{jti:jwt.sign({},"tcmTM")}]
        const token=jwt.sign({authClaims},"tcmTM" ,{expiresIn:"2d"});
        res.status(200).json({id:existingUser._id,token:token});
        }
        else{
            return res.status(400).json({message:"Invalid Credentials"});
        }
    }
    )
})
module.exports = router;












































































// const router = require("express").Router();
// const User = require("../models/user");
// const bcrypt = require("bcryptjs");
// const validator = require("validator");

// router.post("/sign-in", async (req, res) => {
//     try {
//         const { username, email, password } = req.body;


//         if (!username || !email || !password) {
//             return res.status(400).json({ message: "All fields (username, email, password) are required." });
//         }


//         if (!validator.isEmail(email)) {
//             return res.status(400).json({ message: "Invalid email format." });
//         }


//         const existingUser = await User.findOne({ username: username });
//         if (existingUser) {
//             return res.status(400).json({ message: "Username already exists" });
//         }

//         if (username.length < 4) {
//             return res.status(400).json({ message: "Username should have at least 4 characters" });
//         }

//         const existingEmail = await User.findOne({ email: email });
//         if (existingEmail) {
//             return res.status(400).json({ message: "Email already exists" });
//         }

//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword,
//         });

//         await newUser.save();
//         return res.json({ message: "Sign-in successful" });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Something went wrong, Internal Server Error" });
//     }
// });

// module.exports = router;
