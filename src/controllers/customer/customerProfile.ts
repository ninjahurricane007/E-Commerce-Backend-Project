import { Request, Response } from 'express';
import EcCustomers from "../../models/ec_customers";

const getCustomerProfile = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.body.jwt_decoded;
    const found = await EcCustomers.findOne({
      where: { registration_id: userId },attributes:['e_mail','full_name'],
      raw: true,
    });
   
    console.log(found);
   
    res.send(found);
    //   return found;
  };

export default getCustomerProfile