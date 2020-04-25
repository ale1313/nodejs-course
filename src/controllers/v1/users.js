// MODULES
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// MODELS
const Users = require('../../mongo/models/users');

const tokenExpiration = '5m';

const createUser = async (req, res) => {
  try {
    const {
      data, email, password, username,
    } = req.body;
    const hash = await bcrypt.hash(password, 15);
    await Users.create({
      data,
      email,
      password: hash,
      username,
    });
    res.send({ status: 'ok', message: 'User created' });
  } catch (e) {
    console.log(e);
    let message = '';
    if (e.code && e.code === 11000) message = 'The email or username already exists';
    else message = 'Something unexpected happened';
    res.status(500).send({ status: 'ERROR', message });
  }
};

const deleteUser = (req, res) => {};

const getUsers = (req, res) => {};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      const isOk = await bcrypt.compare(password, user.password);
      if (isOk) {
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: tokenExpiration });
        res.send({ status: 'ok', data: { token } });
      } else {
        res.status(403).send({ status: 'INVALID_CREDENTIALS', message: 'The submitted password is not correct' });
      }
    } else {
      res.status(401).send({ status: 'USER_NOT_FOUND', message: 'User not found' });
    }
  } catch (e) {
    res.status(500).send({ status: 'ERRO', message: e.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      userId, data, email, password, username,
    } = req.body;
    await Users.findByIdAndUpdate(userId, {
      data,
      email,
      password,
      username,
    });
    res.send({ status: 'ok', message: 'User updated' });
  } catch (e) {
    console.log(e);
    const message = 'Something unexpected happened';
    res.status(500).send({ status: 'ERROR', message });
  }
};

module.exports = {
  createUser, deleteUser, getUsers, login, updateUser,
};
