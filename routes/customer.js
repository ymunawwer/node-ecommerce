var express = require('express');
var router = express.Router();
var auth = require('../middleware/passport-strategy');
var commonCtrl = require('../controllers/common/user');
passport = require('passport')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.post('/login',passport.authenticate('customStrategy',{successRedirect:'/success',failureRedirect:'/failure'}));

router.post('/login',commonCtrl.login);
router.post('/register',commonCtrl.register);

module.exports = router;
