const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offerSchema = new Schema({
    category:{
        type:String,
        required:true

    },
    start:{
        type:Date,
        required:true

    },
    end:{
        type:Date,
        required:true

    },
    status:{
        type:Number,
        required:true

    },
    productid:{
        type:String,
        required:true

    },
    discount:{
        type:Number,
        required:true
    }


})



class OfferClass {
    static async createOffer(data){
        data = new this(data).save();
        data =data.toObject();
        return data;


    }

   

    static async removeOffer(id){

        let data = this.findById(mongoose.Types.ObjectId(id)).deleteOne();
        if(data.deletedCount>0)
        {
            return data

        }else{
             throw new Error("No Product found.")

        }


    }

    static async changeStatus(id,status){
        let data = this.update({'_id':mongoose.Types.ObjectId(id)},{$set:{'status':status}});
        data = data.toObject();
    
        return data;
    }

    static async updateOffer(data){
        let data = this.update({'_id':mongoose.Types.ObjectId(data._id)},{$set:data});
        data = data.toObject();
    
        return data;

    }



}

offerSchema.loadClass(OfferClass);

module.exports = mongoose.model('offer',offerSchema);