// import express from 'express';
// import checkInOutController from '../controllers/checkInOutController.js';

// const router = express.Router();

// router.post('/checkin', checkInOutController.checkIn);
// router.post('/checkout', checkInOutController.checkOut);

// export default router;


// const express = require('express');
// const router = express.Router();
// const jwt = require('jsonwebtoken');
// const UserModel = require('../models/UserModel');
// const CheckInOut = require('../models/CheckInOutModel');
// const mongoose = require('mongoose');
// import express from 'express';
// import jwt from 'jsonwebtoken';
// import mongoose from 'mongoose';
// import UserModel from '../models/user.model.js';
// import CheckInOut from '../models/CheckInOut.js';
// import router from './userRoutes';
// import 
// // const router = express.Router();
// // Middleware to verify JWT token
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     return res.status(401).send('Access denied. No token provided.');
//   }
//   try {
//     const decoded = jwt.verify(token, 'your_secret_key');
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(400).send('Invalid token.');
//   }
// };

// // check-in route
// router.post('/checkin', verifyToken, async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.userId);
//     if (!user) {
//       return res.status(404).send('User not found');
//     }
//     const checkInOut = new CheckInOut({ 
//       _id: new mongoose.Types.ObjectId(), 
//       userId: user._id, 
//       checkInDateTime: new Date() 
//     });
//     await checkInOut.save();
//     res.status(201).send('Checked in successfully');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

// // check-out route
// router.post('/checkout', verifyToken, async (req, res) => {
//   try {
//     const checkInOut = await CheckInOut.findOne({ userId: req.userId, checkOutDateTime: null });
//     if (!checkInOut) {
//       return res.status(404).send('No active check-in found for this user');
//     }
//     checkInOut.checkOutDateTime = new Date();
//     await checkInOut.save();
//     res.status(200).send('Checked out successfully');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

// export default router;


// import express from 'express';
// import mongoose from 'mongoose';
// // import checkUserAuth from '../middleware/checkUserAuth.js';

// // import CheckInOut from '../models/CheckInOut';
// const CheckInOut = require('../models/CheckInOutModel');
// const router = express.Router();

// // check-in route
// router.post('/checkin', checkUserAuth, async (req, res) => {
//   try {
//     const checkInOut = new CheckInOut({ 
//       _id: new mongoose.Types.ObjectId(), 
//       userId: req.user._id, 
//       checkInDateTime: new Date() 
//     });
//     await checkInOut.save();
//     res.status(201).send('Checked in successfully');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

// // check-out route
// router.post('/checkout', checkUserAuth, async (req, res) => {
//   try {
//     const checkInOut = await CheckInOut.findOne({ userId: req.user._id, checkOutDateTime: null });
//     if (!checkInOut) {
//       return res.status(404).send('No active check-in found for this user');
//     }
//     checkInOut.checkOutDateTime = new Date();
//     await checkInOut.save();
//     res.status(200).send('Checked out successfully');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

// export default router;


// routes/checkInOutRoutes.js
// import express from 'express';
// import mongoose from 'mongoose';
// import checkUserAuth from '../middlewares/checkUserAuth.js'; 
// import CheckInOut from '../models/CheckInOut.js'; 

// const router = express.Router();

// // Check-in route
// router.post('/checkin', checkUserAuth, async (req, res) => {
//   try {
//     const checkInOut = new CheckInOut({
//       _id: new mongoose.Types.ObjectId(),
//       userId: req.user._id,
//       checkInDateTime: new Date()
//     });
//     await checkInOut.save();
//     res.status(201).send('Checked in successfully');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

// // Check-out route
// router.post('/checkout', checkUserAuth, async (req, res) => {
//   try {
//     const checkInOut = await CheckInOut.findOne({ userId: req.user._id, checkOutDateTime: null });
//     if (!checkInOut) {
//       return res.status(404).send('No active check-in found for this user');
//     }
//     checkInOut.checkOutDateTime = new Date();
//     await checkInOut.save();
//     res.status(200).send('Checked out successfully');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

// export default router;

// routes/checkInOutRoutes.js
import express from 'express';
// import mongoose from 'mongoose';
import checkUserAuth from '../middlewares/checkUserAuth.js'; 
// import CheckInOut from '../models/CheckInOut.js';
import checkInOutControl from '../controllers/checkInOutController.js';
const router = express.Router();


router.post('/checkin', checkUserAuth,checkInOutControl.checkIn);
router.post('/checkout', checkUserAuth, checkInOutControl.checkOut);
router.get('/entries', checkUserAuth, checkInOutControl.checkInOutHistory);

export default router;
