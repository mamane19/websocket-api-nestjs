import * as mongoose from "mongoose";
import { Transaction } from "src/transactions/transactions.model";

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  avatar: string;
  googleId: string;
  googleToken: string;
  googleRefreshToken: string;
  githubId: string;
  githubToken: string;
  githubRefreshToken: string;
  transactions?: Transaction;
}

export const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  googleId: {
    type: String,
    required: false,
  },
  googleToken: {
    type: String,
    required: false,
  },
  googleRefreshToken: {
    type: String,
    required: false,
  },
  githubId: {
    type: String,
    required: false,
  },
  githubToken: {
    type: String,
    required: false,
  },
  githubRefreshToken: {
    type: String,
    required: false,
  },
  transactions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "transactions",
    required: false,
  },
});

export interface UserModel extends mongoose.Model<User> {
  findByEmail(email: string): Promise<User>;
}

userSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email });
};

export const User = mongoose.model<User, UserModel>("User", userSchema);
