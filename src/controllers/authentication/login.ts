import { Request, Response } from 'express';
import EcSuppliers from '../../models/ec_suppliers';
import EcCustomers from '../../models/ec_customers';
import jwt from 'jsonwebtoken'
 
 
const postLogin=async (req: Request, res: Response): Promise<void> => {
    const { e_mail, password, client_type } = req.body;
    try {
       
        if (client_type === "supplier") {
            const data = await EcSuppliers.findOne({ where: { e_mail: e_mail }, raw: true });
            if (data?.password === password) { 
                const token=jwt.sign(
                    { userId:data?.registration_id, client_type }, //payload
                    'this-is-my-secret-id', //secret key
                    {expiresIn: '24hr'} //expiration time
                )
                res.status(200).json({ message: `Login successful with token: ${token}` });
            }
            else {
                res.status(401).json({ message: "Unauthorized Login..." });
            }
        }
        else if (client_type === "customer") {
            const data = await EcCustomers.findOne({ where: { e_mail: e_mail }, raw: true })
            if (data?.password === password) {
                const token=jwt.sign(
                    { userId:data?.registration_id, client_type },
                    'this-is-my-secret-id',
                    {expiresIn: '24hr'}
                )
                res.status(200).json("Login Successful...");
            }
            else {
                res.status(401).json({ message: "Invalid credentials" })
            }
        }
    }
    catch (error: any) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
 
export default postLogin;