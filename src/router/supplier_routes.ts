import express from 'express'; //to get router function from express
import { Request, Response } from 'express';
import getSupplierProfile from '../controllers/supplier/supplierProfile';
import postSupplierRegistration from '../controllers/supplier/supplierRegistration';
import patchResetPassword from '../controllers/authentication/reset_password';
import { verifyToken } from '../middleware/verifyjwt';
import addProducts from '../controllers/products/addProduct';
import getProduct from '../controllers/products/getProducts';
import editProduct from '../controllers/products/editProducts';
import getProductsSupplier from '../controllers/products/getProductsSupplier';
 
const supplierRouter = express.Router();

supplierRouter.get('/',verifyToken,async(req:Request,res:Response)=>{
    getSupplierProfile(req,res)
})

supplierRouter.post('/',async(req:Request,res:Response)=>{
    postSupplierRegistration(req,res)
})

supplierRouter.patch('/',verifyToken, async(req:Request,res:Response)=>{
    patchResetPassword(req,res)
})

supplierRouter.post('/addProducts',verifyToken, async(req:Request,res:Response)=>{
    addProducts(req,res)
})

supplierRouter.get('/getProduct',verifyToken, async(req:Request,res:Response)=>{
    getProduct(req,res)
})

supplierRouter.get('/getProductsSupplier',verifyToken, async(req:Request,res:Response)=>{
    getProductsSupplier(req,res)
})

supplierRouter.patch('/editProduct',verifyToken, async(req:Request,res:Response)=>{
    editProduct(req,res)
})
 
export default supplierRouter;