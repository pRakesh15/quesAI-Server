import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import express from 'express'
import { errorMiddleWare } from './src/middlewares/errorHendler.js';
import userRoute from "./src/routes/auth.route.js";

 const app=express();

 //for use env file  .
config();
//these are the basic middlewares..
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/",(req,res)=>{
    
res.send("JAY SHREE RAM");
})

// //add the user router
app.use("/api/v1/user",userRoute)

// //add the seat routs
// app.use("/api/v1/seat",seatRout)

app.use(errorMiddleWare);


export default app;