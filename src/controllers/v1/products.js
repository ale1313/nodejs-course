const Products = require('../../mongo/models/products');

const createProduct = async (req, res) => {
  try {
    const {
      description, images, name, price, user,
    } = req.body;

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

const deleteProduct = (req, res) => {};

const getProducts = async (req, res) => {
  try {
    const products = await Products.find().populate('user', 'data email name role');
    res.send({ status: 'ok', data: products });
  } catch (e) {
    console.log(e);
    const message = 'Something unexpected happened';
    res.status(500).send({ status: 'ERROR', message });
  }
};

const getUserProducts = async (req, res) => {
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

const updateProduct = (req, res) => {};

module.exports = {
  createProduct, deleteProduct, getProducts, getUserProducts, updateProduct,
};
