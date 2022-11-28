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
      type:String
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

UserSchema.statics.findByCredentails = async function (email, password) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("invalid user or password");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("invalid password");
  return user;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
