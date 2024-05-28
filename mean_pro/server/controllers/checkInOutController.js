
// import CheckInOut from "../models/CheckInOut.js";

// class checkInOutControl {
//   static checkIn = async (req, res) => {
//     try {
//       const { userId } = req.body;
//       const checkInOut = new CheckInOut({ userId, checkInDateTime: new Date() });
//       await checkInOut.save();
//       res.status(201).send('Checked in successfully');
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Server Error');
//     }
//   };

//   static checkOut = async (req, res) => {
//     try {
//       const { userId } = req.body;
//       const checkInOut = await CheckInOut.findOne({ userId, checkOutDateTime: null });
//       if (!checkInOut) {
//         return res.status(404).send('No active check-in found for this user');
//       }
//       checkInOut.checkOutDateTime = new Date();
//       await checkInOut.save();
//       res.status(200).send('Checked out successfully');
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Server Error');
//     }
//   };
// }
// export default checkInOutControl;
// // module.exports = checkInOutControl;


import mongoose from 'mongoose';
import CheckInOut from "../models/CheckInOut.js";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
class checkInOutControl {

// Function to check out a user
static checkOut = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(`Attempting to check out user with ID: ${userId}`); // Debugging line

    // Find the last check-in without a check-out
    let lastCheckIn = await CheckInOut.findOne({ userId }).sort({ checkInDateTime: -1 });
    console.log('Last check-in found:', lastCheckIn); // Debugging line

    if (!lastCheckIn) {
      return res.status(403).json('No active check-in found.');
    }

    // Check if the check-in is within the last 24 hours
    const checkInTime = new Date(lastCheckIn.checkInDateTime);
    const currentTime = new Date();
    const timeDiff = currentTime - checkInTime;
    const hoursPassed = timeDiff / (1000 * 60 * 60); // Convert milliseconds to hours

    if (hoursPassed >= 24) {
      return res.status(400).json('Cannot check out. 24-hour window for check-in has expired.');
    }

    // Update the check-out time
    lastCheckIn.checkOutDateTime = new Date();
    await lastCheckIn.save();
    console.log('Updated check-out time:', lastCheckIn.checkOutDateTime); // Debugging line

    res.status(200).json('Checked out successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
};


// Function to check in a user
static checkIn = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the last check-in
    const lastCheckIn = await CheckInOut.findOne({ userId }).sort({ checkInDateTime: -1 });

    // Check for active check-in
    if (lastCheckIn && !lastCheckIn.checkOutDateTime) {
      return res.status(403).json('You have an active check-in. Please check out first.');
    }

    // Check if the last check-in was less than 24 hours ago
    if (lastCheckIn) {
      const now = new Date();
      const lastCheckInDateTime = new Date(lastCheckIn.checkInDateTime);
      const timeDifference = now - lastCheckInDateTime;

      if (timeDifference < 24 * 60 * 60 * 1000) { // Less than 24 hours
        return res.status(403).json('You can only check-in once every 24 hours.');
      }
    }

    // Create a new check-in entry
    const checkInOut = new CheckInOut({
      _id: new mongoose.Types.ObjectId(),
      userId: userId,
      checkInDateTime: new Date()
    });
    await checkInOut.save();

    // Schedule auto-checkout 24 hours + 1 second after check-in
    const autoCheckoutTime = new Date(checkInOut.checkInDateTime.getTime() + 24 * 60 * 60 * 1000 + 1000);
    setTimeout(() => autoCheckOut(checkInOut._id), autoCheckoutTime - new Date());

    res.status(201).json('Checked in successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
};

// Function to automatically check out users after 24 hours
static autoCheckOut = async (checkInId) => {
  try {
    const checkIn = await CheckInOut.findById(checkInId);
    if (checkIn && !checkIn.checkOutDateTime) {
      checkIn.checkOutDateTime = new Date();
      await checkIn.save();
      console.log(`Auto checked out user ${checkIn.userId} for check-in at ${checkIn.checkInDateTime}`);
    }
  } catch (error) {
    console.error('Error during auto check-out:', error);
  }
};
static checkIn = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find the last check-in
    const lastCheckIn = await CheckInOut.findOne({ userId }).sort({ checkInDateTime: -1 });

    // Check for active check-in
    if (lastCheckIn && !lastCheckIn.checkOutDateTime) {
      return res.status(403).json('You have an active check-in. Please check out first.');
    }

    // Check if the last check-in was less than 24 hours ago
    if (lastCheckIn) {
      const now = new Date();
      const lastCheckInDateTime = new Date(lastCheckIn.checkInDateTime);
      const timeDifference = now - lastCheckInDateTime;

      if (timeDifference < 24 * 60 * 60 * 1000) { // Less than 24 hours
        return res.status(403).json('You can only check-in once every 24 hours.');
      }
    }

    // Create a new check-in entry
    const checkInOut = new CheckInOut({
      _id: new mongoose.Types.ObjectId(),
      userId: userId,
      checkInDateTime: new Date()
    });
    await checkInOut.save();

    // Schedule auto-checkout 24 hours + 1 second after check-in
    const autoCheckoutTime = new Date(checkInOut.checkInDateTime.getTime() + 24 * 60 * 60 * 1000 + 1000);
    setTimeout(() => autoCheckOut(checkInOut._id), autoCheckoutTime - new Date());

    res.status(201).json('Checked in successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
};

// Function to automatically check out users after 24 hours
static autoCheckOut = async (checkInId) => {
  try {
    const checkIn = await CheckInOut.findById(checkInId);
    if (checkIn && !checkIn.checkOutDateTime) {
      checkIn.checkOutDateTime = new Date();
      await checkIn.save();
      console.log(`Auto checked out user ${checkIn.userId} for check-in at ${checkIn.checkInDateTime}`);
    }
  } catch (error) {
    console.error('Error during auto check-out:', error);
  }
};

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

export default checkInOutControl;