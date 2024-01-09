import express from 'express'; //to get router function from express
import { Request, Response } from 'express';
import getSupplierRegistration from '../controllers/authentication/reset_password';
import { postSupplierRegistration } from '../controllers/supplier/supplierRegistration';
import patchResetPassword from '../controllers/authentication/reset_password';
import { verifyToken } from '../middleware/verifyjwt';
 
const supplierRouter = express.Router();

supplierRouter.get('/',async(req:Request,res:Response)=>{
    getSupplierRegistration(req,res)
})

supplierRouter.post('/',async(req:Request,res:Response)=>{
    postSupplierRegistration(req,res)
})

supplierRouter.patch('/',verifyToken, async(req:Request,res:Response)=>{
    patchResetPassword(req,res)
})
 
export default supplierRouter;