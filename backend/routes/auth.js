import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
const router = express.Router();

//Register
router.post("/register", async (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10);
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("Wrong credentials");

    const validate = await bcrypt.compare(req.body.password, user.password);
    !validate && res.status(404).json("Wrong credentials");

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

const authRoutes = router;

export default authRoutes;
