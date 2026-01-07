const express = require("express");
const app = express();
require("dotenv").config();
require("./connection/conn");  
const cors = require("cors");
const UserAPI = require("./routes/user");
const TaskAPI=require("./routes/task");


app.use(cors({
    origin: "https://task-management-mern-hlqy.vercel.app", // frontend URL
    credentials: true
}));

app.use(express.json()); 

// Routes
app.use("/api/v1", UserAPI);  // This forwards requests starting with /api/v1 to UserAPI
app.use("/api/v2", TaskAPI); 


// Basic route for testing
app.use("/", (req, res) => {
    res.send("Hello from Backend");
});

// Start the server on port 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
