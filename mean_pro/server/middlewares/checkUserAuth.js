import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

const checkUserAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = authorization.split(' ')[1];

            // Verify Token
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await UserModel.findById(userID);
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized User' });
            }

            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: 'Unauthorized User' });
        }
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};

export default checkUserAuth;
