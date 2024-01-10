import express from 'express'; //to get router function from express
import { Request, Response } from 'express';

import postCustomerRegistration from '../controllers/customer/customerRegistration';
import patchResetPassword from '../controllers/authentication/reset_password';
import { verifyToken } from '../middleware/verifyjwt';
import getCustomerProfile from '../controllers/customer/customerProfile';

const customerRouter = express.Router();

customerRouter.get('/',async(req:Request,res:Response)=>{
    getCustomerProfile(req,res)
})

customerRouter.post('/',async(req:Request,res:Response)=>{
    postCustomerRegistration(req,res)
})

customerRouter.patch('/',verifyToken, async(req:Request,res:Response)=>{
    patchResetPassword(req,res)
})
 
export default customerRouter;