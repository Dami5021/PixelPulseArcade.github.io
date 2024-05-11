const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error retrieving this user: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

const addUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }
  const user = new User({ username, email, password });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error adding user: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting user: ", error);
    res.status(500).json({ message: "Request failed" });
  }
};

module.exports = { getAllUsers, getUser, addUser, updateUser, deleteUser };
