import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import express from 'express'
import { errorMiddleWare } from './src/middlewares/errorHendler.js';
import userRoute from "./src/routes/auth.route.js";
import projectRoute from "./src/routes/project.route.js";
import fileRoute from "./src/routes/file.route.js";
import cors from 'cors'

 const app=express();

 //for use env file  .
config();
//these are the basic middlewares..
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL,
]
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/",(req,res)=>{
    
res.send("JAY SHREE RAM");
})

//add the user router
app.use("/api/v1/user",userRoute)

//add the project routs
app.use("/api/v1/project",projectRoute)

//add the file routs
app.use("/api/v1/file",fileRoute)

app.use(errorMiddleWare);


export default app;