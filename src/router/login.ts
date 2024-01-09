import express from 'express';
import { Request, Response } from 'express';
import postLogin from '../controllers/authentication/login';
 
const login = express.Router();
 
login.post("/", async (req: Request, res: Response) => {
    postLogin(req,res)
});
 
export default login;