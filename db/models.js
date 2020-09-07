// // for register
//
// // 1, connect to db
const mongoose = require('mongoose');
const md5 = require('blueimp-md5');
mongoose.connect('mongodb://localhost:27017/lighttalk',{
  useNewUrlParser: true,
      useUnifiedTopology: true
}).then(
    _ =>
        console.log("DB Connected"))
    .catch(err =>
        console.log("Connection refused")
    );

// 2. define a schema
const userSchema = mongoose.Schema({
  username:{type: String, require:true},
  password:{type:String, require: true},
  type:{type:String, require:true},
  avatar:{type:String},
  post:{type:String},
  info:{type:String},
  company:{type:String},
  salary:{type:String}
})

// 3. define a model
const UserModel = mongoose.model('user',userSchema);

exports.UserModel = UserModel
