const router = require("express").Router();
const User = require("../model/user");

//creating user
router.post("/", async (req, res) => {
  try {
    const { firstname, lastname, username, email, password, imageslink } = req.body;
    console.log(req.body);
    const user = await User.create({
      firstname,
      lastname,
      username,
      email,
      password,
      imageslink
    });
    res.status(201).json(user);
    
    // res.status(200).json()
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

//login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    user.status = "online";
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
