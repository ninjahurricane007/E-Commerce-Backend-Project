import { client } from "../../services/mongodb"
import { Collection, Db, ObjectId } from "mongodb"
import {Request, Response} from 'express'

const db:Db=client.db('e-commerce')
const getProduct=async(req:Request,res:Response):Promise<void>=>{
    try{
        const{product_id}=req.body
        const productCollections=db.collection('products')
        console.log(productCollections)
        const filter = new ObjectId(product_id as string)
        const productDetails=await productCollections.find({ _id: filter }).toArray()
        res.status(200).json({Details:productDetails})
    }
    catch(error){
        res.status(500).json({error:error})
    }
}

export default getProduct