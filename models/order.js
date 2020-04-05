const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var orderSchema = new Schema({
product:[{
    alias:{
        type:String,
        required:true

    },
    name:{
        type:String,
        required:true

    },
    description:{
        type:String

    },
    price:{
        type:Number,
        required:true

    },
    category:{
        type:String,


    },
    size:{
        type:Number,
        required:true

    },
    quantity:{
        type:Number,
        required:true,
        default:0


    },
    producttype:{
        type:String


    },
    color:{
        type:String,
        required:true

    },
    picture:[{
        type:String

    }],

    warranty:{
        type:Number,
        default:0,
        required:true

    },
    paymentmode:{
        type:String
        
    },
    
    supplierid:{
        type:mongoose.Types.ObjectId,
        required:true
        
    }
}],
total:{
type:Number,
required:true
},
tax:{
    type:Number,
required:true

},
status_c:{
    type:String,
default:'Pending',
required:true
},
status_s:{
    type:String,
default:'Pending',
required:true

},
    customerid:{
        type:mongoose.Types.ObjectId,
        required:true
    }
    





    





},{ strict: false })



class OrderClass{

    static async createOrder(data){


        data = await new this(data).save();
        data = data.toObject();
        return data;

    }
    static async updateStatusC(orderid,status){
        let data = await this.find({'_id':orderid},{$set:{'status_c':status}});

        return data;

        }

        static async updateStatusS(orderid,status){
            let data = await this.find({'_id':orderid},{$set:{'status_s':status}});
    
            return data;
    
            }



}

orderSchema.loadClass(OrderClass);


module.exports = mongoose.model('order',orderSchema);