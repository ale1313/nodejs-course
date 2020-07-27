// TYPES
import { Application } from 'express';

// ROUTES
import usersRoutes from './users';
import productsRoutes from './products';

export default (app: Application): void => {
  app.use('/api/v1/users', usersRoutes);
  app.use('/api/v1/products', productsRoutes);
};
