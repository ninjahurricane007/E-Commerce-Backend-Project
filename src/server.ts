import express, { NextFunction } from 'express'
import sequelize from '../src/config/sequelize-config.ts'
import supplierRouter from './router/supplier_routes.ts'
import customerRouter from './router/customer_routes.ts'
import login from './router/login.ts'
import {Request,Response} from 'express'
import { firstExampleMW } from './middleware/middlewareExample.ts'
import { secondExampleMW } from './middleware/middlewareExample.ts'
import sequelizeSync from './services/sequelize.ts'
import { connectToMongoDb, stopMongoDb } from './services/mongodb.ts'
import cors from 'cors'
import { Server,Socket } from 'socket.io'
import { createServer } from 'http'
import initializeSocket from './services/socket.ts'

const app=express() //app is an object of express class
const server=createServer(app)
const io=initializeSocket(server)
const port=3000

io.on('connection', (socket:Socket) => { //when handshake with client is completed connection event is triggered
    console.log('a user connected')

    socket.emit("event emmited", "Hello from backend")

    socket.on('out of stock emit received',()=>{
        console.log("Received from front end also")
    })

    socket.on('disconnect',()=>{
        console.log("User disconnected")
    })
  });

const corsOption = {
    Accept: 'application/json, text/html',
    origin: 'http://localhost/8080',
    methods: 'GET, POST, PUT, PATCH',
}
//middleware process the res and req before reaching routes
//next will redirect the control to next middleware
app.use(cors(corsOption)) //allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources
app.use(express.urlencoded({extended:true})) //decoding and encoding eg:%20 is used instead of space.
app.use(express.json()) //middleware for body to json conversion

app.use((req,res,next)=>{
    console.log("hi from middleware")
    next() //execute next app.use
})

interface CustomRequest extends Request {
    customProperty?: object;
};
 
// app.use((req: CustomRequest, res, next) => { //creating a custom property
//     firstExampleMW(req,res,next)
// });
 
// app.use((req, res, next) => { //setting the header for the custom property
//     secondExampleMW(req,res,next)
// });
 
app.get("/example",firstExampleMW,secondExampleMW, (req: CustomRequest, res: Response) => { //to print the custom property
    console.log("Route Handler-Handling Request");
    const customProperty = req.customProperty ?? 'Not-available'; 
    res.send(customProperty);
});

sequelizeSync()
connectToMongoDb()
// sequelize.sync({force:false}) //drop table if force is true
// .then(()=>{
//     console.log('Database synced')
// })
// .catch((error)=>{
//     console.error("Error syncing database:",error)
// })

app.use("/api/v1",supplierRouter)
app.use("/api/v2",customerRouter)
app.use("/api/v3",login)

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})

server.listen(3001,()=>{
    console.log(`Socket Listening ${port}`)
})

process.on("SIGINT",()=>{
    sequelize.close(); stopMongoDb();
    process.exit() //process is the instance of node running on machine
})

process.on("exit",()=>{
    sequelize.close(); stopMongoDb();
})

export default io

