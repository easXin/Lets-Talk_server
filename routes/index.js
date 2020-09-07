var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// post -> body
router.post('/register', function(req,res){
  console.log("Register router is called")
  const {username,password} = req.body;
  if(username==='admin'){
    res.send({code: 1, msg: 'Username Already Exists'});
  }else{
    res.send({code: 0, data: {_id: 'abc', username:username, password:password}});
  }
})


module.exports = router;
