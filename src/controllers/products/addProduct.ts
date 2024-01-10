import {client} from '../../services/mongodb'
import {Request, Response} from 'express'
import { MongoClient, ServerApiVersion, Db } from 'mongodb';

const db: Db=client.db('e-commerce')
const addProducts=async (req:Request,res:Response):Promise<any>=>{
    try{
        const{product_name,category,product_photo,product_stock,...other_data}=req.body
        
        if(!product_name||!category||!product_photo||!product_stock){
            res.status(400).json({message:"Bad Request"})
        }
        
        const supplier_id=req.body.jwt_decoded
        
        const productDocument={
            supplier_id,
            product_name,
            category,
            product_photo:Buffer.from(product_photo,'base64'),
            product_stock,
            ...other_data,
        }

        delete productDocument.jwt_decoded

        const productCollection=db.collection('products')

        await productCollection.insertOne(productDocument)

        res.status(200).json({message:"Product Inserted"})
    }
    catch(error){
        console.error(error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export default addProducts