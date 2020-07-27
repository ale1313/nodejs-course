/* eslint-disable @typescript-eslint/no-explicit-any */
// MODULES
import jwt from 'jsonwebtoken';

// TYPES
import { NextFunction, Request, Response } from 'express';

const isValidHostname = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { hostname } = req;
  if (hostname === 'localhost') {
    next();
  } else {
    res.status(403).send({ status: 'ACCESS_DENIED' });
  }
};

const isAuth = (req: Request, res: Response, next: NextFunction): void => {
  const { token } = req.headers;
  try {
    if (token) {
      const { JWT_SECRET } = process.env;
      const { userId } = req.body;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const data: any = jwt.verify(token as string, JWT_SECRET!);
      if (data.userId !== userId && data.role !== 'admin') {
        throw {
          code: 403,
          status: 'ACCESS_DENIED',
          errorMessage: 'Permission denied',
        };
      } else {
        next();
      }
    } else {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        errorMessage: 'Missing token',
      };
    }
  } catch (e) {
    console.log(e);
    const message = 'Something unexpected happened';
    res.status(e.code || 500).send({
      status: e.status || 'ERROR',
      message: e.errorMessage || message,
    });
  }
};

const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { token } = req.headers;
    const { JWT_SECRET } = process.env;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const data: any = jwt.verify(token as string, JWT_SECRET!);
    if (data.role !== 'admin') {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        errorMessage: 'Permission denied',
      };
    }
    next();
  } catch (e) {
    console.log(e);
    const message = 'Something unexpected happened';
    res.status(e.code || 500).send({
      status: e.status || 'ERROR',
      message: e.errorMessage || message,
    });
  }
};

export { isAdmin, isAuth, isValidHostname };
