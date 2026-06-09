const express= require("express");
const cors= require("cors");
const mongoose=require("mongoose");
const usersRoutes=require('./Routes/usersRoutes');
const app= express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use('/api/auth',usersRoutes)

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Mongodb connected sucessfully")
}).catch((err)=>{
    console.log(err.message);
});

const server=app.listen(process.env.PORT,()=>{
    console.log(`lisening at ${process.env.PORT}`)
});