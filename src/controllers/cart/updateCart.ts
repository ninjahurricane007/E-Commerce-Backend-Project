import {Request,Response} from 'express'
import EcCart from '../../models/ec_cart'
import { error } from 'console'

const updateCart=async(req:Request,res:Response):Promise<void>=>{
    try{
        const {product_id,quantity}=req.body
        const {registration_id,client_type}=req.body.jwt_decoded
        if(!product_id || !quantity || !registration_id || client_type != "customer"){
            res.status(404).json({error:error.toString()})
        }
        await EcCart.update({ quantity }, { where: { product_id } })
        res.status(200).json({ message: 'Quantity updated' })

    }
    catch(err){
        console.error(err)
    }
}

export default updateCart