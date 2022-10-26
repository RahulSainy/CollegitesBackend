import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  reviewProduct,
} from '../controllers/product.js'
import { protect, admin } from '../middleware/check-auth.js'

router.route('/').get(getProducts).post(protect, createProduct)
router.route('/:id/reviews').post(protect, reviewProduct)

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, updateProduct)

export default router
















//Better Approach above

// import express from 'express'
// const router = express.Router()
// const Product = require("../models/product");
// const { post } = require('./user');
// const checkAuth = require('../middleware/check-auth.js');

// router.post("/add", checkAuth, (req,res,next)=>{
//     const post = new Product({
//         title: req.body.title, 
//         name: req.body.name
         
//     })
//     post.save().then(createdProduct=>{
//         res.status(201).json({
//             message:"Product Added SucessFully",
//             productId : createdProduct._id
//         })
//     })
// })

// router.get("",(req,res,next)=>{
//     post.find().then(products=>{
//         res.status(200).json({
//             message: "Product fetched Sucssefully",
//             products:products
//         })
//     })
// })

// router.get(":/id", (req,res,next)=>{
//     Product.findById(req.params.id).then(product=>{
//         if(product){
//             res.status(200).json(post)
//         }
//         else{
//             res.status(404).json({message:"Post not found!"})
//         }
//     });
// });


// router.delete(":/id",checkAuth,(req,res,next)=>{
//     Product.deleteOne({_id: req.params.id}).then(result=>{
//         console.log(result);
//         res.status(200).json({message: "Post deleted!"})
//     })
// })