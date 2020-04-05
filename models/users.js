var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

  bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
    user_name:{
        index: { unique: true } ,
        type:String,
        required:true
    },
    first_name:{
        type:String,
        required:true
        
    },
    last_name:{
        type:String,
        required:true
    },
    middle_name:{
        type:String,
    },
    email:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    phone_number:{
        required:true,
        unique:true,
        type:Number
    },
    profile_pic:{
        type:String
    },
    home_phone:{
        type:Number,

    },
    house_number:{
        type:String,
        required:true

    },
    street:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    pin_code:{
        type:Number,
        required:true
    },
    verification_mode:{
        type:String,
        default:'auto'
        
    },
   
    admin_confirmation:{
        type:Boolean,
        default:false,
        // rerequired:true
    },
    forgot_password: {
        token: String,
        expiry: Date,
      },

      roles: [{
        type: String,
        default: 'customer',
        required:true
      }],
      fax:{
  
        type:String
    }



});


userSchema.pre('save',  function(next) {
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
  

  
  userSchema.methods.comparePassword = function(formInputPassword, cb) {
    bcrypt.compare(formInputPassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};



  class UserClass{


    // static async doLogin(email,password,roles){
    //     email = email.toLowerCase();
    //     console.log('MODEL USER LOGIN = ', { email, roles: roles });
    //     var user = await this.findOne({email,roles});
    //     if (user === null) throw new Error('Email is not found.');
    //     else if (!commonHelper.comparePassword(password, user.password)) throw new Error('User name and password is not valid.');
    //     else {
    //         console.log('succesful');
    //     }
    
    
    //     }


static async createUser(first_name, last_name,middle_name,profile_pic,user_name,email,password,phone_number,home_phone,fax,roles,house_number,street,city,state,country,pin_code){
    email = email.toLowerCase();
    let userExist = await this.count({ email });
    if(userExist) throw new Error('Email is already exist.');
    let phoneExist = await this.count({phone_number})
    if(phoneExist) throw new Error('Phone is already exist.');
    let faxExist = await this.count({fax})
    if(faxExist) throw new Error('Fax is already exist.');
    roles = roles ? [roles] : ['user'];
    var data = new User({
        'first_name':first_name, 
        'last_name':last_name,
        'middle_name':middle_name,
        'profile_pic':profile_pic,
        'fax':fax,
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
        'pin_code':pin_code,
        'roles':roles

    })
    
    data = await new this(data).save();
    data = data.toObject();
    
    return data;
}

static async doLogin(email,password,roles){
    email = email.toLowerCase();
    console.log('MODEL USER LOGIN = ', { email, roles: roles });
    var user = await this.findOne({email,roles});
    if (user === null) throw new Error('Email is not found.');
    else if (!commonHelper.comparePassword(password, user.password)) throw new Error('User name and password is not valid.');
    else {
        console.log('succesful');
    }


    }

deleteUser(user_name){

}

getUser(user_name){

}

getUserCount(){
    let count = this.count({})
    return count;
}


}

  

  userSchema.loadClass(UserClass)


const User = mongoose.model('user', userSchema);
module.exports = User;