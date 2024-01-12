import { Request, Response } from 'express'
import EcCart from '../../models/ec_cart'
import { error } from 'console';
 
const addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        const products= req.body as { _id:string, quantity:number }[]  //items are not added to db when clicked on add to cart button, Instead all cart items are added during logout and checkout
        const { client_type, userId } = req.body.jwt_decoded

        if (!products) {
            res.status(402).json({ error: error.toString() })
        }

        for(const product of products){
            if(!product._id || !product.quantity || client_type != "customer"){
                res.status(404).json({ error: error.toString() })
            }
            const existingCartItem = await EcCart.findOne({
                where: { product_id: product._id, registration_id: userId }
            });

            if (existingCartItem) {
                res.status(200).json({ message: 'Product already in cart' })
            }
            else{
                await EcCart.create({ product_id:product._id, registration_id: userId, quantity:product.quantity }, { raw: true });
                res.status(200).json({ message: 'Item added to cart' })
            }  
        }
    }
    catch (error: any) {
        res.status(500).json({ error: error.toString() });
    }
};
 
export default addToCart;