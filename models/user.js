const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  team_name: {
    type: String,
    required: true,
    unique: true,
    minlength: 2,
    maxlength: 50
  },
  leader_name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  ps_number: {
    type: Number,
    required: true
  },
  link: {
    type: String,
    required: true,
  },
  member1: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  member2: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  member3: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  member4: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  member5: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  }


  // name: {
  //   type: String,
  //   required: true,
  //   minlength: 2,
  //   maxlength: 50
  // },
  // email: {
  //   type: String,
  //   required: true,
  //   minlength: 5,
  //   maxlength: 255,
  //   unique: true
  // },
  // password: {
  //   type: String,
  //   required: true,
  //   minlength: 5,
  //   maxlength: 1024
  // },
  // isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      team_name: this.team_name,
      leader_name: this.leader_name,
      ps_number: this.ps_number,
      link: this.link,
      member1: this.member1,
      member2: this.member2,
      member3: this.member3,
      member4: this.member4,
      member5: this.member5
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    team_name: Joi.string()
      .min(2)
      .max(50)
      .required(),
    leader_name: Joi.string()
      .min(5)
      .max(255)
      .required(),
    ps_number: Joi.number()
      .min(1)
      .max(20)
      .required(),
    link: Joi.string()
      .required(),
    member1: Joi.string()
      .required(),
    member2: Joi.string()
      .required(),
    member3: Joi.string()
      .required(),
    member4: Joi.string()
      .required(),
    member5: Joi.string()
      .required()
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
