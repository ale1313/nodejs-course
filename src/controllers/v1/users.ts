// MODULES
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

// MODELS
import Users from '../../mongo/models/users';
import Products from '../../mongo/models/products';

const tokenExpiration = '5m';

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, email, password, role, username } = req.body;
    const hash = await bcrypt.hash(password, 15);
    await Users.create({
      data,
      email,
      password: hash,
      role,
      username,
    });
    res.send({ status: 'ok', message: 'User created' });
  } catch (e) {
    console.log(e);
    let message = '';
    if (e.code && e.code === 11000) {
      message = 'The email or username already exists';
    } else message = 'Something unexpected happened';
    res.status(500).send({ status: 'ERROR', message });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        errorMessage: 'The "userId" param is required',
      };
    }
    await Users.findByIdAndDelete(userId);
    await Products.deleteMany({ user: userId });
    res.send({ status: 'ok', message: 'User deleted' });
  } catch (e) {
    const message = 'Something unexpected happened';
    res
      .status(e.code || 500)
      .send({ status: 'ERROR', message: e.errorMessage || message });
  }
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await Users.find().select({ password: 0, role: 0, __v: 0 });
    res.send({ status: 'ok', data: users });
  } catch (e) {
    const message = 'Something unexpected happened';
    res.status(500).send({ status: 'error', message });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        const { JWT_SECRET } = process.env;
        const token = jwt.sign(
          { userId: user._id, role: user.role },
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          JWT_SECRET!,
          { expiresIn: tokenExpiration }
        );
        res.send({ status: 'ok', data: { token } });
      } else {
        res.status(403).send({
          status: 'INVALID_CREDENTIALS',
          message: 'The submitted password is not correct',
        });
      }
    } else {
      res
        .status(401)
        .send({ status: 'USER_NOT_FOUND', message: 'User not found' });
    }
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, data, email, password, role, username } = req.body;
    const hash = await bcrypt.hash(password, 15);
    await Users.findByIdAndUpdate(userId, {
      data,
      email,
      password: hash,
      role,
      username,
    });
    res.send({ status: 'ok', message: 'User updated' });
  } catch (e) {
    console.log(e);
    const message = 'Something unexpected happened';
    res.status(500).send({ status: 'ERROR', message });
  }
};

export default { createUser, deleteUser, getUsers, login, updateUser };
