import EcSuppliers from '../../models/ec_suppliers';
import { Request, Response } from 'express';

const getSupplierProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body.jwt_decoded;
    const found = await EcSuppliers.findOne({
      where: { registration_id: userId },attributes:['e_mail','full_name'],
      raw: true,
    });

    res.status(200).json(found);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default getSupplierProfile;
