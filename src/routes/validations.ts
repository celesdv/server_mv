import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const headerToken = req.headers["authorization"];

  if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
    try {
      const bearerToken = headerToken.slice(7);
      jwt.verify(bearerToken, process.env.SECRET_KEY || "melcejviajes");
      next();
    } catch (error) {
      res.status(403).json({
        msg: `Token invalido`,
      });
    }
  } else {
    res.status(401).json({
      msg: `No posee Autorización`,
    });
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const headerToken = req.headers["authorization"];

  if (headerToken != undefined && headerToken.startsWith("Bearer ")) {
    try {
      const bearerToken = headerToken.slice(7);
      const data: any = jwt.verify(
        bearerToken,
        process.env.SECRET_KEY || "melcejviajes"
      );

      if (data.roleId != 1)
        return res.status(401).json({
          msg: `No posee Autorización`,
        });
        
      next();
    } catch (error) {
      res.status(403).json({
        msg: `Token invalido`,
      });
    }
  } else {
    res.status(401).json({
      msg: `No posee Autorización`,
    });
  }
};
