

// // // Create the model for the CheckInOut collection
// // const CheckInOut = mongoose.model('CheckInOut', checkInOutSchema);

// // // Export the model
// // module.exports = CheckInOut;

// // checkInOutModel.js


// import mongoose from 'mongoose';
// const checkInOutSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'UserModel', // User Reference to the User model
//         required: true
//     },
//     checkInDateTime: { type: Date, required: true },
//     checkOutDateTime: { type: Date },
//     // You can add more fields as needed
// });

// const CheckInOut = mongoose.model('CheckInOut', checkInOutSchema);


// export default CheckInOut;

import mongoose from 'mongoose';

const checkInOutSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel', // User Reference to the User model
        required: true
    },
    checkInDateTime: { type: Date, required: true },
    checkOutDateTime: { type: Date },
    // You can add more fields as needed
});

const CheckInOut = mongoose.model('CheckInOut', checkInOutSchema);

// Create a new check-in/out record
// export async function createCheckInOut(user, checkInDateTime) {
//     try {
//         const newCheckInOut = new CheckInOut({
//             userId: user._id, // Use the _id of the User object
//             checkInDateTime
//         });

//         await newCheckInOut.save();
//         return newCheckInOut;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }

export default CheckInOut;