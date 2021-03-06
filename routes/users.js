var express = require('express');
var router = express.Router();
var auth = require('../middleware/passport-strategy');
passport = require('passport')
var commonCtrl = require('../controllers/common/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/post',passport.authenticate('customStrategy',{successRedirect:'/success',failureRedirect:'/failure'}));

router.post('/login',commonCtrl.login);

module.exports = router;
