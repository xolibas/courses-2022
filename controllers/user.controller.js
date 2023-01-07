const userService = require('../services/user.service');

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const token = await userService.register({ username, email, password });
    return res.status(201).json({ token });
  } catch (err) {
    if (err.message === 'User already registered') {
      return res.status(409).json({ message: 'User already registered' });
    }

    return res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await userService.login({ email, password });
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getProfile = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await userService.getProfile(userId);
    return res.status(200).json({ user });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
