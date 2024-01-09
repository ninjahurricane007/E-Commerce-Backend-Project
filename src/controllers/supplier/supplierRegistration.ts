import { Request, Response } from 'express';
import EcSuppliers from '../../models/ec_suppliers'

const getSupplierRegistration=async(req:Request,res:Response): Promise<void>=>{
    try{
        const {e_mail}=req.query;
    await EcSuppliers.findOne({
        where:{e_mail:e_mail}
    ,raw:true});
    res.status(201).json({message:`Email:${e_mail}`})
}
    catch(error:any){
        console.log(error)
        res.status(500).json({error:error.toString()})
    }
}

const postSupplierRegistration=async(req:Request,res:Response): Promise<void>=>{
    try{
        const { full_name,e_mail,password,profile_pic }=req.body //destructuring
        await EcSuppliers.create({ //wait till insertion is performed in db
        full_name,
        e_mail,
        password,
        profile_pic:Buffer.from(profile_pic), //convert into a binary data type
    },{raw:true}) //remove metadata
    res.status(201).json({message:`Inserted the data of ${full_name}`})
    }
    catch(error:any){
        console.log(error)
        res.status(500).json({error:error.toString()})
    }
}

export default getSupplierRegistration
export {postSupplierRegistration}