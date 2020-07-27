/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response } from 'express';

import Products from '../../mongo/models/products';

const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { description, images, name, price, user } = req.body;

    const product = await Products.create({
      description,
      images,
      name,
      price,
      user,
    });
    res.send({ status: 'ok', data: product });
  } catch (e) {
    console.log(e);
    const message = 'Something unexpected happened';
    res.status(500).send({ status: 'ERROR', message });
  }
};

const deleteProduct = (req: Request, res: Response): void => {
  console.log('');
};

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Products.find().populate(
      'user',
      'data email name role'
    );
    res.send({ status: 'ok', data: products });
  } catch (e) {
    console.log(e);
    const message = 'Something unexpected happened';
    res.status(500).send({ status: 'ERROR', message });
  }
};

const getUserProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const products = await Products.find({ user: userId });
    res.send({ status: 'ok', data: products });
  } catch (e) {
    console.log(e);
    const message = 'Something unexpected happened';
    res.status(500).send({ status: 'ERROR', message });
  }
};

const updateProduct = (req: Request, res: Response): void => {
  console.log('');
};

export default {
  createProduct,
  deleteProduct,
  getProducts,
  getUserProducts,
  updateProduct,
};
