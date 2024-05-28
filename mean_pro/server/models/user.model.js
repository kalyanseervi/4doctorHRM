import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  token: { type: Boolean },
  city: { type: String },
  jobTitle: { type: String, required: true },
  bio: { type: String },
  // userImage: { type: String, required: true }
});
// collection name users not user
const UserModel = mongoose.model('user', userSchema);

export default UserModel;
