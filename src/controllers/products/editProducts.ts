import {client} from '../../services/mongodb'
import {Request, Response} from 'express'
import { Db,ObjectId } from 'mongodb';
import io from '../../server';
import { Socket } from 'socket.io';

const db: Db=client.db('e-commerce')
const editProducts=async (req:Request,res:Response):Promise<any>=>{
    try{
        const{product_id, ...updateFields}=req.body
        const newQuantity=req.body.product_stock
        console.log(newQuantity)
        const{client_type}=req.body.jwt_decoded
        if (!product_id || client_type !== "supplier"){
            res.status(400).json({message:"Bad Request"})
        }

        const productCollection=db.collection('products')

        delete updateFields.jwt_decoded
        
        const filter = { _id: new ObjectId(product_id as string) };
        
        const updatedProduct=await productCollection.updateOne(filter, { $set: updateFields })
        if(newQuantity){
            if(newQuantity==="0"){
                io.emit("Product out of stock")
            }
        }
        if(updatedProduct.modifiedCount>0){
            res.status(200).json({message:"Product Updated"})
        }
        else{
            res.status(404).json({message:"Nothing to update"})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export default editProducts