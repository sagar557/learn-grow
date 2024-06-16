require('dotenv').config();

import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt  from 'jsonwebtoken' ;

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  },
  role: string;
  isVarified: boolean;
  courses: Array<{ courseId: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
};

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name field cannot be empty'],
  },
  email:{
    type:String,
    required: [true, 'Email field cannot be empty'], 
    validate: {
      validator: function (value: string) {
        return emailRegexPattern.test(value);
      },
      message: 'Please provide a valid Email address'
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    select: false,
  },
  avatar: {
    public_id: String,
    url: String,
  },
  role: {
    type: String,
    default: "user",
  },
  isVarified: {
    type: Boolean,
    default: false,
  },
  courses: [{
    courseId: String,
  }],
}, { timestamps: true });

//Hash password before saving
userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// sign access token
userSchema.methods.SignAccessToken = function (){
  return jwt.sign({id: this._id}, process.env.ACCESS_TOKEN_SECRET || '', {
    expiresIn: "30m"
  });
};

//sign refresh token (logic not provided, implement refresh token handling)
userSchema.methods.SignRefreshToken = function (){
  // Implement refresh token generation and logic here
  // This example is for demonstration purposes only and doesn't include refresh token functionality
  return jwt.sign({id: this._id}, process.env.REFRESH_TOKEN_SECRET || '', {
    expiresIn: "3d",
  })
};

//Compare hashed password with user
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);
export default userModel;
