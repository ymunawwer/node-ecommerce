const User = require('../../models/users');
var passport = require('passport');
var jwt = require('jsonwebtoken');

const register = (req,res,next)=>{

    const user_response =  User.createUser(req.body.first_name,req.body.last_name,req.body.middle_name,req.body.profile_pic,req.body.user_name,req.body.email,req.body.password,req.body.phone_number,req.body.home_phone,req.body.fax,req.body.roles,req.body.house_number,req.body.street,req.body.city,req.body.state,req.body.country,req.body.pin_code);

    user_response.then(function(){
        res.status(200).send({"error code":200,"data":user_response,"message":"User register succesfully.","status":true})
    }).catch(function(err){
       
        console.log("err",err);
        res.status(500).send({"error code":500,"message":"User register Failed.","status":false,'error':err.message})

    })
    



}







const login = (req,res,next)=>{
    // console.log(req.body)
    passport.authenticate('local-startegy', {session: false,failureRedirect: '/login'}, function(err, user, info){
    
      if(err){
         
        return res.status(400).json({
          "error_code":400,
          "message":"Invalid input",
          "user":user
        })
      }
        req.login(user, {session: false}, (err) => {
          if (err) {
            res.status(400).json({
              "error_code":400,
              "message":"please try again later.",
              "data":err
            })
          }
      
      const token = jwt.sign({'user':user}, 'your_jwt_secret',{expiresIn: 6000});
      if(user){
        return res.json({'token': token});

          
      
      }else{
        return res.status(401).json({
          "error_code":401,
          "message":"Invalid input"
          
        })
      // res.redirect('/login');
      }
   });
  })(req,res);
    
  }

module.exports = {
    register,
    login
}