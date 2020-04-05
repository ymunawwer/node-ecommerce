const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
customerid:{
    type:mongoose.Types.ObjectId,
    required:true
},

product:[{
id:{
    type:mongoose.Types.ObjectId,
    required:true
},
name:{
    type:String,
    required:true
},
quantity:{
    type:Number,
    required:true
},
total:{
    type:Number,
    required:true

}



}],
total_price:{
    type:Number,
    required:true,
    default:0

},
total_tax:{
    type:Number,
    required:true,
    default:0

},
total_quantity:{
    type:Number,
    required:true,
    default:0

}














})


class CartClass{

    static async addToCart(data){
        data = await new this(data).save();
        data = data.toObject();
        return data;
    }
    static async updateCart(data){
        data = await this.findByIdAndUpdate({'_id':mongoose.Types.ObjectId(data._id)},data)
        data = data.toObject();
        return data;
    }

    static async clearCart(id){
        let data = await this.find({'_id':mongoose.Types.ObjectId(id)}).deleteOne();
        if(data.deletedCount>0)
        {
            return data

        }else{
             throw new Error("No cart found.")

        }
        // console.log(data = data.toObject())

        
        
        
    }

    static async removeCartItem(id){
        // data = await new this(data).save();
        // data = data.toObject();
        // return data;
    }

}

cartSchema.loadClass(CartClass);


module.exports =  mongoose.model('cart',cartSchema);
