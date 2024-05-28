import UserModel from '../models/user.model.js';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import CheckInOut from '../models/CheckInOut.js';
import upload from '../middlewares/multer-config.js';


// UserController class start here
class UserController {


    static userRegistration = async (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ "status": "failed", "message": err });
            } else {
                const { name, email, password, confirmPassword, token, city, jobTitle, bio } = req.body;
                // const userImage = req.file ? req.file.path : null;

                let user = await UserModel.findOne({ email: email });
                if (user) {
                    return res.status(409).json("Email already in use");
                } else {
                    if (name && email && password && confirmPassword && city && jobTitle && bio) {
                        if (password === confirmPassword) {
                            try {
                                const salt = await bcrypt.genSalt(10);
                                const hashedPassword = await bcrypt.hash(password, salt);
                                const newUser = new UserModel({
                                    name: name,
                                    email: email,
                                    password: hashedPassword,
                                    confirmPassword: hashedPassword,
                                    token: token,
                                    city: city,
                                    jobTitle: jobTitle,
                                    bio: bio,
                                   
                                });
                                await newUser.save();
                                const saved_user = await UserModel.findOne({ email: email });
                                // Generate JWT Token
                                const token2 = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });

                                res.status(201).json({ "status": "success", "message": "Registration Success", "token2": token2 });
                            } catch (error) {
                                res.status(500).json({ "status": "failed", "message": "Unable to Register" });
                            }
                        } else {
                            return res.status(400).json('Passwords do not match');
                        }
                    } else {
                        return res.status(400).json("All fields are required");
                    }
                }
            }
        });
    }


    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                let user = await UserModel.findOne({ email: email });
                if (user != null) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if ((user.email === email) && isMatch) {
                        // Generate JWT Token
                        const token2 = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '3d' });

                        // Send the response and then log the message
                        res.status(200).json({
                            "status": "success", "message": "Login success", "token2": token2
                        });
                        console.log(req.body);
                        // This line should be removed, as the response has already been sent
                        // res.status(200).send({ msg: 'user.controller.ts login successfully' });
                    } else {
                        res.status(400).json({
                            "status": "failure", "message": "Invalid credentials Not Resgistered User"
                        });
                    }
                } else {
                    res.status(400).json({
                        "status": "failure", "message": "Invalid credentials"
                    });
                }
            } else {
                res.status(400).json({ "status": "fail", "message": "Invalid data provided." });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ "status": "fail", "message": "Something went wrong!" });
        }
    };


    static loggedUser = async (req, res) => {
        res.status(200).json({ 'user': req.user });
    }



    static getUserAttendance = async (req, res) => {
        const { userId } = req.body;
        console.log(userId)
        const user = await CheckInOut.findById(userId);
        console.log(user);
        res.send({ "status": "success", "message": "User Attendance", "info": user });
    }

    // Fetch check-in/out history for the logged-in user
    static checkInOutHistory = async (req, res) => {
        try {
            const userId = req.user._id;
            const history = await CheckInOut.find({ userId }).sort({ checkInDateTime: -1 });
            res.status(200).json(history);
        } catch (error) {
            console.error(error);
            res.status(500).json('Server Error');
        }
    };

   
}

export default UserController;