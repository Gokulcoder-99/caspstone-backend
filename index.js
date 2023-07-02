const express = require("express");
const app = express();
const env = require("dotenv")
const cors = require("cors");
const Dbconnect = require('./db/connectDB')
const auth = require('./routes/loginroutes')
const vaildChech = require("./middleware/vaildCheck")
const adminCheck = require("./middleware/adminCheck");
const adminRoutes = require('./routes/adminroutes')
const counterCheck = require('./middleware/counterCheck')
const counterRouter = require('./routes/counterRoutes')
const employeeRouter = require("./routes/employeeRoutes.js")


env.config()
app.use(express.json());
app.use(cors({ 
    origin: 'https://capstone-frontend-aymk.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true  
}));
app.use("/api/auth",auth);
app.use("/api/admin",vaildChech,adminCheck,adminRoutes)
app.use("/api/counter",vaildChech,counterCheck,counterRouter)
app.use('/api/employee',employeeRouter)


const port = process.env.PORT
const server = async()=>{
    try{
       await Dbconnect()
        app.listen(port,()=>{
            console.log(`${port} is connected`)
        })
    }catch(err){
            console.log(err,'server is not running')
    }
}
server();
