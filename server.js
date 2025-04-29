import app from "./index.js";
import { connectDB } from "./src/config/databaseConfig.js";


const port=process.env.port || 8090;
const hostname="127.0.0.1";

//check the database connection
connectDB();

app.listen(port,()=>
    {
        console.log(`server started at http://${hostname}:${port}`)
    })