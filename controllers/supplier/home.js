const Product = require('../../models/product');
const Order = require('../../models/order');

const getProductCount = (id)=>{
    // console.log(req.params.id)
    let productcount = Product.getProductCountBySupplierId(id);
    // let ordercount = 
    
    productcount.then((data)=>{
        return data  
    }).catch((err)=>{
        throw new Error("Something went wrong with Product count.")   
    })
    

    

}

const getTotalOrderCount = (id)=>{

}

const getSalesAndReturns = (id)=> {

}

const getOrderLocation = (id) => {


}
const getTopBuyer = (id) => {

}

const getLatestOrder = (id) => {

}

const getLatestReturn = (id) => {

}


const getHome = () => {

}

module.exports = {
    getHome
}