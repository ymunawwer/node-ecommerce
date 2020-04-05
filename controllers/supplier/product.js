const Product = require('../../models/product');

const add = (req,res,next)=>{
 const product_response = Product.addProduct(req.body);
 product_response.then((data)=>{
     res.status(200).send({"status code":200,"message":"New product added Succesfully.","data":data});

 }).catch((err)=>{
     console.log(err.message)
    res.status(500).send({"status code":500,"message":"Please try again.","data":err.message});
 })
}


const getProduct = (req,res,next)=>{
    const product_response = Product.getProductBySupplierId(req.params.id);
    product_response.then((data)=>{
        res.status(200).send({"status code":200,"message":"New product added Succesfully.","data":data});
   
    }).catch((err)=>{
        console.log(err.message)
       res.status(500).send({"status code":500,"message":"Please try again.","data":err.message});
    })
   }
   

const remove = (req,res,next)=>{
    const product_response = Product.deleteProduct(req.body.id);
    product_response.then((data)=>{
        res.status(200).send({"status code":200,"message":"Product Removed Succesfully.","data":data});
    }).catch((err)=>{
        res.status(500).send({"status code":500,"message":"Please try again.","data":err.message});

    })

}

const update = (req,res,next)=>{
    const product_response = Product.updateProduct(req.body);
    product_response.then((data)=>{
        res.status(200).send({"status code":200,"message":"Product Update Succesfully.","data":data});
    }).catch((err)=>{
        res.status(500).send({"status code":500,"message":"Please try again.","data":err.message});

    })

}



module.exports = {
    add,
    remove,
    update,
    getProduct
}