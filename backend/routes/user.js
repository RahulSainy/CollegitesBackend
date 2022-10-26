import express from 'express'
const router = express.Router()
import {
  authUser,
  getUserProfile,
  registerUser,
  emailSend,
  getUsers,
  deleteUser,
  updateUserProfile,
  getUserById,
  verificationLink,
} from '../controllers/user.js'
import { protect, admin } from '../middleware/check-auth.js'
router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/verificationlink').post(verificationLink)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

router.route('/email').post(protect, emailSend)
router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .put(protect, updateUserProfile)
  .get(protect, getUserById)
export default router
















//Better Approach Above

// import express from 'express'
// const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken')

// const User = require("../models/user");

// const router = express.Router();

// router.post("/signup", (req, res, next) => {
//   //Bcrypt to incrypt user's password in DB
//   bcrypt.hash(req.body.password, 10).then(hash => {
//     const user = new User({
//       email: req.body.email,

//       //not stored raw password used hash instead
//       password: hash
//     });
//     user
//       .save()
//       .then(result => {
//         res.status(201).json({
//           message: "User created!",
//           result: result
//         });
//       })
//       .catch(err => {
//         res.status(500).json({
//           error: err
//         });
//       });
//   });

//   // //without bycrypting
//   // const user =  new User({
//   //     email: req.body.email,
//   //     password: req.body.password
//   // })
// });

// router.get("/signup", (req, res, next) => {
//   User.find().then(documents => {
//     res.status(200).json({
//       message: "Posts fetched successfully!",
//       posts: documents
//     });
//   });
// });


// router.post('/login', (req, res, next) => {
//   let fetchedUser;
//   User.findOne({ email: req.body.email }).then(user => {
//     if (!user) {
//       return res.status(401).json({
//         message: "Auth Failed"
//       })
//     }
//     fetchedUser = user
//     return bcrypt.compare(req.body.password, user.password)
//   }).then(result => {

//     if (!result) {
//       // used return below to prevent execution of below code as it will execute eventually
//       return res.status(401).json({
//         message: "Auth Failed"
//       });
//     }
//     const token = jwt.sign({ email: fetchedUser.email, userid: fetchedUser._id }, 'abc@1234_will_add_longer_later', { expiresIn: "1h" });
//     res.status(200).json({
//       token: token
//     });
//   }).catch(err => {
//     return res.status(401).json({
//       message: "Auth Failed"
//     });
//   });
// })
// module.exports = router;