var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

  bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
    'user_name':{
        index: { unique: true } ,
        type:String,
        required:true
    },
    'email':{
        required:true,
        type:String
    },
    'password':{
        required:true,
        type:String
    },
    'phone_number':{
        required:true,
        unique:true,
        type:Number
    },
    'profile_pic':{
        type:String
    },
    'home_phone':{
        type:Number,

    },
    'house_number':{
        type:String,
        required:true

    },
    'street':{
        type:String,
        required:true
    },
    'city':{
        type:String,
        required:true
    },
    'state':{
        type:String,
        required:true
    },
    'country':{
        type:String,
        required:true
    },
    'pin_code':{
        type:Number,
        required:true
    }



});


UserSchema.pre('save',  function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


userSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
  };
  



  class UserClass{

createUser(user_name,email,password,phone_number,home_phone,house_number,street,city,state,country,pin_code){
    var data = new User({
        'user_name':user_name,
        'email':email,
        'password':password,
        'phone_number':phone_number,
        'home_phone':home_phone,
        'house_number':house_number,
        'street':street,
        'city':city,
        'state':state,
        'country':country,
        'pin_code':pin_code

    })
    data.Save((err,user) => {
        if (err) throw err;
        res.status(200).json({'status_code':200,'data':user});
    });
}

deleteUser(user_name){

}

getUser(user_name){

}


}

  }

  userSchema.loadClass(UserClass)


const User = mongoose.model('user', userSchema);
module.exports = User;