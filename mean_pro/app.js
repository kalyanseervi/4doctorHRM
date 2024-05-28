// or server.js

import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './server/config/db.js';
import userRoutes from './server/routes/userRoutes.js';
import  checkInOutRoutes  from './server/routes/checkInOutRoutes.js';
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL; // Corrected variable name
// const cors = require('cors');
connectDB(DATABASE_URL);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files for uploaded images
app.use('/uploads', express.static('uploads'));

//load routers
app.use("/api/user", userRoutes)
app.use('/api/checkinout', checkInOutRoutes);

// server
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});


