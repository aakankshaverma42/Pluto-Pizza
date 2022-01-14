const mongoose = require("mongoose");
 const Schema = mongoose.Schema


const signupSchema = new Schema({
  name: { type: String, require:true},
  email: { type: Number, require:true,unique:true},
  password:{ type: String, require:true},
  role:{  type: String, default:'customer'}
});

const signupModel = mongoose.model("signup", signupSchema);

module.exports = signupModel;