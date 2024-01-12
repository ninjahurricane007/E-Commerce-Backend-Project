import express from 'express'; //to get router function from express
import { Request, Response } from 'express';
import addToCart from '../controllers/cart/addToCart';
import postCustomerRegistration from '../controllers/customer/customerRegistration';
import patchResetPassword from '../controllers/authentication/reset_password';
import { verifyToken } from '../middleware/verifyjwt';
import getCustomerProfile from '../controllers/customer/customerProfile';
import getProduct from '../controllers/products/getProducts';
import updateCart from '../controllers/cart/updateCart';

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

customerRouter.patch('/updateCart',verifyToken, async(req:Request,res:Response)=>{
    updateCart(req,res)
})

customerRouter.get('/getProduct',verifyToken, async(req:Request,res:Response)=>{
    getProduct(req,res)
})

customerRouter.post('/addToCart',verifyToken,async(req:Request,res:Response)=>{
    addToCart(req,res)
})
 
export default customerRouter;