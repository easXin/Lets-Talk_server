const express = require('express');
const router = express.Router();
const md5 = require('blueimp-md5');
//const UserModel = require('../db/models').UserModel;
const {UserModel} = require('../db/models');
// init
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
     /register : post_> body
     username  okay   str
     password  okay   str
     type      okay   str
     0 : pass  1 : err
     > use md5 to encrypt password, before the data get sending to mongo
 */


// post -> body
router.post('/register', (req,res) => {
  // 1. get user's data, check if this user is already exists
  const{username,password,type} = req.body;
  UserModel.findOne({username},(err,user) =>{
      if(!user){                // base 64 hash code
        new UserModel({username, password:md5(password),type})
            .save((err,user)=>{
              // remark user as login by default  with cookie || session
              res.cookie('userid',user._id,{maxAge:1000*60*7});
              res.send({code:0,data:{_id:user.id,username,type}});
            })
      }else{
        res.send({code:1,msg:`Username \'${username}\' has been taken`});
      }
  })
})
/*
      /login    post
      username    Y   str
      password    Y   str
 */
router.post('/login',(req,res)=>{
  const{username,password} = req.body;

  UserModel.findOne({username,password:md5(password)},(err,user)=>{
      if(!user){
        res.send({code:1,msg:'The username or password is incorrect'})
      }else{
        res.cookie('userid',user._id,{maxAge:1000*60*7});
        res.send({code:0,data:user});
      }
  })
})

/*
   /update    post
   avatar     Y
   info       n
   post       n
   salary     n
   company    n
 */

router.post('/update',  (req, res) => {

  const id = req.cookies.userid;
  //console.log(req.cookies)
  if(!id){
    // login is outdated
    return res.send({code:1, msg:'Your login session is expired, please re-login '})
  }
  // query user's data from db, then update it
  // https://mongoosejs.com/docs/api.html
  console.log(req.body)
  UserModel.findByIdAndUpdate({_id:id},req.body,(err,user)=>{

    const {_id, username, type} = user;
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
    const data = Object.assign(req.body, {_id, username, type})
    res.send({code: 0, data})
  }).catch(err =>{
    res.send({code: 1, msg:"User is not found"})
  })
})

module.exports = router;
