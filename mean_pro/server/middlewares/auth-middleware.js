import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

const checkUserAuth = async (req, res, next) => {
    let token;

    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // get token2 from header
            token = authorization.split(' ')[1];

            // console.log("token", token);
            // console.log("Authorization", authorization);

            // Verify Token
           
            const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const user = await UserModel.findById(userID);
            // console.log(userID);
            // console.log(req.user);
          
            req.user = user;
            next()
        } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Unauthorized User" })
        }
    }
    if (!token) {
        res.send({ "status": "failed", "message": "Unauthorized User, No token2" })
    }
}
export default checkUserAuth;