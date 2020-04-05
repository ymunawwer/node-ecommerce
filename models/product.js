const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({

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
    size:[{
        type:Number,
        required:true

    }],
    quantity:[{
        type:Number,
        required:true,
        default:0


    }],
    producttype:{
        type:String


    },
    color:[{
        type:String,
        required:true

    }],
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
    availability:{
        type:Number,
        required:true
        
    },
    supplierid:{
        type:mongoose.Types.ObjectId,
        required:true
        
    },
    





    





},{ strict: false })


class ProductClass {

    static async addProduct(data){
        console.log(data)
        if(typeof(data.alias)===undefined) throw new Error("please enter alias.");
        if(typeof(data.name)===undefined) throw new Error("please enter alias.");
        if(typeof(data.price)===undefined) throw new Error("please enter price.");
        if(typeof(data.category)===undefined) throw new Error("please enter category.");

        if(typeof(data.size)===undefined) throw new Error("please enter size.");
        if(typeof(data.quantity)===undefined) throw new Error("please enter quantity.");
        if(typeof(data.availability)===undefined) throw new Error("please check the availability.");
        if(typeof(data.supplierid)===undefined) throw new Error("please Contact support.");
        data.supplierid = mongoose.Types.ObjectId(data.supplierid);
        
        data = await new this(data).save();
        data = data.toObject();
    
        return data;

    }



    static async deleteProduct(id){
        // console.log( mongoose.Types.ObjectId(id))
        // id = mongoose.Types.ObjectId(id);
        console.log(id)
        if(typeof(id)===undefined) throw new Error("PLease provide valid product id.")
        if(typeof(id)==='') throw new Error("PLease provide valid product id.")
        if (mongoose.Types.ObjectId.isValid(mongoose.Types.ObjectId(id))) {
            // Yes, it's a valid ObjectId, proceed with `findById` call.
          
        let data = await this.find({'_id':mongoose.Types.ObjectId(id)}).deleteOne();
        if(data.deletedCount>0)
        {
            return data

        }else{
             throw new Error("No Product found.")

        }
        // console.log(data = data.toObject())
        
        }else{
            throw new Error("Please provide valid product id.")
        }


    }




    static async updateProduct(data){

        if(typeof(data.alias)===undefined) throw new Error("please enter alias.");
        if(typeof(data.name)===undefined) throw new Error("please enter alias.");
        if(typeof(data.price)===undefined) throw new Error("please enter price.");
        if(typeof(data.category)===undefined) throw new Error("please enter category.");

        if(typeof(data.size)===undefined) throw new Error("please enter size.");
        if(typeof(data.quantity)===undefined) throw new Error("please enter quantity.");
        if(typeof(data.availability)===undefined) throw new Error("please check the availability.");
        if(typeof(data.supplierid)===undefined) throw new Error("please Contact support.");
        data = await this.findByIdAndUpdate({'_id':mongoose.Types.ObjectId(data.id)},data,{new:true});
        data = data.toObject();
    
        return data;

        
    }
    static async getProductCountBySupplierId(id){
        id = mongoose.Types.ObjectId(id);
       let count = await this.count({"supplierid":id });
      
           return count;
      
       
    }

    static async getProductBySupplierId(id){
        id = mongoose.Types.ObjectId(id);
       let data = await this.find({"supplierid":id });
      
           return data;
      
       
    }

    static async getProduct(){
        // id = mongoose.Types.ObjectId(id);
       let data = await this.find({});
      
           return data;
      
       
    }

    static async getProductById(id){
        id = mongoose.Types.ObjectId(id);
       let data = await this.findById({id });
      
           return data;
      
       
    }




}

productSchema.loadClass(ProductClass);

const Product = mongoose.model('product',productSchema);

module.exports = Product;

