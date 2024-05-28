import express from 'express';
const router = express.Router();
import UserController from '../controllers/user.controller.js';
import checkUserAuth from '../middlewares/auth-middleware.js';



// route level middleware - to protect  route
router.use('/loggeduser', checkUserAuth)

// Public routes
router.post('/register', UserController.userRegistration); // create a new user
router.post('/login', UserController.userLogin); // login user


// Protected Routes
router.get('/loggeduser', UserController.loggedUser)
router.get('/getUserAttendance',UserController.getUserAttendance)

export default router; 
