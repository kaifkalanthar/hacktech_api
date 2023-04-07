const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-team_name");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ team_name: req.body.team_name });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["team_name", "leader_name", "ps_number", "link", "member1", "member2", "member3", "member4", "member5"]));
  // const salt = await bcrypt.genSalt(10);
  // user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "team_name", "leader_name", "ps_number", "link", "member1", "member2", "member3", "member4", "member5"]));
});

module.exports = router;
