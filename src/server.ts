import express, { NextFunction } from 'express'
import sequelize from '../src/config/sequelize-config.ts'
import supplierRouter from './router/supplier_routes.ts'
import customerRouter from './router/supplier_routes.ts'
import login from './router/login.ts'
import {Request,Response} from 'express'
import { firstExampleMW } from './middleware/middlewareExample.ts'
import { secondExampleMW } from './middleware/middlewareExample.ts'

const app=express() //app is an object of express class
const port=3000

app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})

//middleware process the res and req before reaching routes
//next will redirect the control to next middleware
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


sequelize.sync({force:false}) //drop table if force is true
.then(()=>{
    console.log('Database synced')
})
.catch((error)=>{
    console.error("Error syncing database:",error)
})

app.use("/api/v1",supplierRouter)
app.use("/api/v2",customerRouter)
app.use("/api/v3",login)


