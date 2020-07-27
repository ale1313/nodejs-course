// MODULES
import express from 'express';
import products from '../../controllers/v1/products';

const router = express.Router();

router.post('/create', products.createProduct);
router.post('/update', products.updateProduct);
router.post('/delete', products.deleteProduct);
router.get('/all', products.getProducts);
router.get('/get/:userId', products.getUserProducts);

export default router;
