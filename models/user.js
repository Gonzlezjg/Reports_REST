const { Schema, model } = require("mongoose");

const userSchema = Schema({
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  reportsCount: {
    type: Number,
    default: 0,
  },
  rol: {
    type: String,
    required: true,
    emun: ["ADMIN", "USER"],
  },
  user_active: {
    type: Boolean,
    default: true,
  },
});

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...data } = this.toObject();

  data.uid = _id;

  return data;
};

module.exports = model("User", userSchema);
