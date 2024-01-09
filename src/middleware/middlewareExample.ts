import {Request,Response} from 'express'
import { NextFunction } from 'express'

interface CustomRequest extends Request {
    customProperty?: object;
};

export const firstExampleMW=(req: CustomRequest, res:Response, next:NextFunction) => {
    req.customProperty = ({ message: 'hello' });
    next();
};
 
export const secondExampleMW=(req: CustomRequest, res:Response, next:NextFunction) => {
    res.setHeader('Content-type', 'application/json');
    res.setHeader('Set-cookie', ['type=ninja', 'language=javascript']);
    next();
}