// for login

// commonjs
const md5 = require('blueimp-md5');
const mongoose = require('mongoose');
//                     protocol                   db_name
mongoose.connect('mongodb://localhost:27017/lighttalk',{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(
    _ =>
        console.log("DB Connected"))
    .catch(err =>
        console.log("Connection refused")
    );

// doc
const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  type: {type: String, required: true}
})

// data collection                      cluster   constraint
const UserModel = mongoose.model('user',userSchema);
// CRUD

function testSave() {
  const user = {
    username: 'test123',
    password: md5('1234'),
    type: 'candidate',
  };
  const userModel = new UserModel(user);
  userModel.save(function (err, user) {
    console.log('save', err, user);
  })
}


function testFind() {
  UserModel.find(function (err, users) {
    console.log('find() ', err, users)
  })

  UserModel.findOne({_id: '5ae1d0ab28bd750668b3402c'}, function (err, user) {
    console.log('findOne() ', err, user)
  })
}

function testUpdate() {
  UserModel.findByIdAndUpdate({_id: '5ae1241cf2dd541a8c59a981'}, {username: 'yyy'},
      function (err, user) {
        console.log('findByIdAndUpdate()', err, user)
      })
}

function testDelete() {
  UserModel.remove({_id: '5ae1241cf2dd541a8c59a981'}, function (err, result) {
    console.log('remove()', err, result)
  })
}

