import { Request, Response } from 'express';
import EcCustomers from '../../models/ec_customers'

const postCustomerRegistration=async(req:Request,res:Response): Promise<void>=>{
    try{
        const { full_name,e_mail,password,profile_pic }=req.body //destructuring
        await EcCustomers.create({ //wait till insertion is performed in db
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

export default postCustomerRegistration