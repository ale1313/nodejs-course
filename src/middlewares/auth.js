// MODULES
const jwt = require('jsonwebtoken');

const isValidHostname = (req, res, next) => {
  const { hostname } = req;
  if (hostname === 'localhost') {
    next();
  } else {
    res.status(403).send({ status: 'ACCESS_DENIED' });
  }
};

const isAuth = (req, res, next) => {
  const { token } = req.headers;
  try {
    if (token) {
      const { JWT_SECRET } = process.env;
      const { userId } = req.body;
      const data = jwt.verify(token, JWT_SECRET);
      if (data.userId !== userId && data.role !== 'admin') {
        throw { code: 403, status: 'ACCESS_DENIED', errorMessage: 'Permission denied' };
      } else {
        next();
      }
    } else {
      throw { code: 403, status: 'ACCESS_DENIED', errorMessage: 'Missing token' };
    }
  } catch (e) {
    console.log(e);
    const message = 'Something unexpected happened';
    res.status(e.code || 500).send({ status: e.status || 'ERROR', message: e.errorMessage || message });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const { token } = req.headers;
    const { JWT_SECRET } = process.env;
    const data = jwt.verify(token, JWT_SECRET);
    if (data.role !== 'admin') {
      throw { code: 403, status: 'ACCESS_DENIED', errorMessage: 'Permission denied' };
    }
    next();
  } catch (e) {
    console.log(e);
    const message = 'Something unexpected happened';
    res.status(e.code || 500).send({ status: e.status || 'ERROR', message: e.errorMessage || message });
  }
};

module.exports = { isAdmin, isAuth, isValidHostname };
