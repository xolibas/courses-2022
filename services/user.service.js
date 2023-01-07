const { compare, genSalt, hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../models/index');

require('dotenv').config();

const User = db.users;

const generateJwt = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET);
};

const register = async (dto) => {
  const emailFound = await User.findOne({ where: { email: dto.email } });
  if (emailFound) {
    throw new Error('User already registered');
  }

  const salt = await genSalt(10);

  const password = await hash(dto.password, salt);

  const user = await User.create({
    email: dto.email,
    username: dto.username,
    password,
  });

  return generateJwt(user.id, user.email);
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error('User with such email or login not exists');

  const isValidPassword = await compare(password, user.password);

  if (!isValidPassword) throw new Error('Invalid password');

  return generateJwt(user.id, user.email);
};

const getProfile = async (id) => {
  const user = await User.findOne({ where: { id } });
  return user;
};

module.exports = {
  register,
  login,
  getProfile,
};
