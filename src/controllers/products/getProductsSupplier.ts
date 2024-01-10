import { client } from "../../services/mongodb"
import { Collection, Db, ObjectId } from "mongodb"
import {Request, Response} from 'express'

const db:Db=client.db('e-commerce')
const getProductsSupplier=async(req:Request,res:Response):Promise<void>=>{
    try{
        const{supplier_id}=req.body.jwt_decoded
        const productCollections=db.collection('products')
        const filter = new ObjectId(supplier_id as string)
        const supplierDetails=await productCollections.find({ _id: filter }).toArray()
        res.status(200).json({Details:supplierDetails})
    }
    catch(error){
        res.status(500).json({error:error})
    }
    
}

export default getProductsSupplier