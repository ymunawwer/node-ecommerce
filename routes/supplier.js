var express = require('express');
var router = express.Router();
var auth = require('../middleware/passport-strategy');
var commonCtrl = require('../controllers/common/user');
passport = require('passport')
const indexCtrl = require('../controllers/supplier');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',passport.authenticate('customStrategy',{successRedirect:'/success',failureRedirect:'/failure'}));
router.post('/register',commonCtrl.register);
router.get('/getproduct/:id',indexCtrl.product.getProduct);
router.post('/product/add',indexCtrl.product.add);
router.post('/product/update',indexCtrl.product.update);
router.post('/product/remove',indexCtrl.product.remove);

module.exports = router;
