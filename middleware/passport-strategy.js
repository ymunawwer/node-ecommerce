var Auth2Strategy = require('passport-oauth2').Strategy,
    passport = require('passport'),
    CustomStrategy = require('passport-custom').Strategy,
    LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').Strategy;
var user = require('../models/users');

   
   

    const auth2 = function(){
        // serialize(passport)
        passport.use(new OAuth2Strategy({
            authorizationURL: 'https://www.example.com/oauth2/authorize',
            tokenURL: 'https://www.example.com/oauth2/token',
            clientID: EXAMPLE_CLIENT_ID,
            clientSecret: EXAMPLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/example/callback"
          },
          function(accessToken, refreshToken, profile, cb) {
            User.findOrCreate({ exampleId: profile.id }, function (err, user) {
              return cb(err, user);
            });
          }
        ));




    }


   const local = function(email){
     
     
    //    serialize(passport)
    passport.use('local-startegy',new LocalStrategy(
      {      usernameField:'email',
      passwordField:'password',
      passReqToCallback:true,
    },
        function(req,email, password, done) {
         
          console.log("email",email)
          console.log("password",password)
          user.findOne({ email: email }, function (err, user) {
            // console.log("user",user)
            if (err) {   return done({'error_code':404,'message':'Unable to login.Please check the username and password.'});}
            if (!user) { return done(400, false); }
            user.comparePassword(password,function(err,isMatch){
              if(err) console.log(err);
              console.log('login console',isMatch);
              if(!isMatch){
                  return done(null, false);
                  
              }
              else if(isMatch){
                  return done(null, true);
              }
            });
          });
        }
      ));
    
    }


    const google0auth = function(){
        // serialize(passport);
        passport.use('googleOauth',new GoogleStrategy({
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "http://www.example.com/auth/google/callback"
          },
          function(accessToken, refreshToken, profile, cb) {
            User.findOrCreate({ googleId: profile.id }, function (err, user) {
              return cb(err, user);
            });
          }
        ));
    }

    const custom = function(){
        // serialize(passport);

        passport.use('customStrategy', new CustomStrategy(
            function(req, callback) {
                console.log(req.body.user)
              // Do your custom user finding logic here, or set to false based on req object
              callback(null, user);
            }
          ));
    }


    module.exports = {
        local,
        google0auth,
        custom
    }