const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstname:{
      type:String,
      required:[true,"Enter your Firstname"]
    },
    lastname:{
      type:String,
      required:[true,"Enter your Lastname"]
    },
    username:{
      type:String,
      required:[true,"Enter an username"],
      unique:[true,"Username already used"]
      
    },
    email:{
      type:String,
      required:[true,"Enter an email"],
      unique:[true,"Email already used!"]
    },
    password:{
      type:String,
      required:[true,"Password is required"]
    },
    imageslink:{
      type:String
    },
    message:{
      type:Object,
      default:{}
    },
    status:{
      type:String,
      default:"Online"
    }
  },
  { minimize: false, timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

UserSchema.statics.findByCredentials = async function (e, p) {
  const user = await User.findOne({ email:e });
  if (!user) throw new Error("invalid user or password");
  const isMatch = bcrypt.compare(p, user.password);
  if (!isMatch) throw new Error("invalid password");
  return user;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
