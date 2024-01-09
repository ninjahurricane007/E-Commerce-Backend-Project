import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
 
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get the Bearer token from the request headers
  const secretKey = "this-is-my-secret-id";
  let token = req.headers.authorization;
 
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
 
  try {
    let processed_token = token.split("Bearer ")[1];
 
    // Verify the token
    const decoded = jwt.verify(processed_token, secretKey);
 
    console.log(decoded);
    // Attach the decoded payload to the request object
    req.body.jwt_decoded = decoded;
    console.log(req.body.jwt_decoded)
    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};


 