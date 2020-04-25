// ROUTES
const usersRoutes = require('./users');
const productsRoutes = require('./products');

module.exports = app => {
  app.use('/api/v1/users', usersRoutes);
  app.use('/api/v1/products', productsRoutes);
};
