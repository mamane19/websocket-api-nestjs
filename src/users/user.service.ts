import { Injectable, NotFoundException } from "@nestjs/common";
import { User } from "./user.model";
import { FilterQuery, Model, UpdateQuery } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserService {
  private blockedFields: (keyof User)[] = ["email", "googleId", "githubId"];

  unpopopulatedFields = "_" + this.blockedFields.join(" _");

  constructor(
    @InjectModel("User") private readonly userSchema: Model<User>,
    @InjectModel("Transaction") private readonly transactionSchema: Model<any>,
    @InjectModel("Expense") private readonly expenseSchema: Model<any>
  ) {}

  // get user by username
  async getUserByUsername(name: string): Promise<User> {
    const username = { $regex: new RegExp(`^${name}$`, "i") };
    const user = await this.userSchema.findOne({ username }).exec();

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  // get user by email
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userSchema.findOne({ email }).exec();

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  // get user by
  async getUserBy(filter: FilterQuery<User>): Promise<User> {
    const user = await this.userSchema.findOne(filter).exec();

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  // get user by google id
  async getUserByGoogleId(googleId: string): Promise<User> {
    const user = await this.userSchema.findOne({ googleId }).exec();

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  // get user by github id
  async getUserByGithubId(githubId: string): Promise<User> {
    const user = await this.userSchema.findOne({ githubId }).exec();

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  // get user by id
  async getUserById(id: string): Promise<User> {
    const user = await this.userSchema.findById(id).exec();

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  // get all users
  async getAllUsers(): Promise<User[]> {
    const users = await this.userSchema.find().exec();

    if (!users) {
      throw new NotFoundException("Users not found");
    }

    return users;
  }

  // update user
  async updateUser(user: User, update: UpdateQuery<User>): Promise<User> {
    const userFound = await this.userSchema
      .findByIdAndUpdate(user._id, update, {
        new: true,
      })
      .exec();

    if (!userFound) {
      throw new NotFoundException("User not found");
    }

    return userFound;
  }

  // filter user
  async filterUser(
    user: User,
    allowedFields: (keyof User)[] = []
  ): Promise<User> {
    const userFound = await this.userSchema
      .findById(user._id)
      .select(allowedFields.join(" "))
      .exec();

    if (!userFound) {
      throw new NotFoundException("User not found");
    }

    return userFound;
  }

  // delete user
  async deleteUser(id: string): Promise<User> {
    const userFound = await this.userSchema.findByIdAndDelete(id).exec();

    if (!userFound) {
      throw new NotFoundException("User not found");
    }

    await this.transactionSchema.deleteMany({ userId: userFound._id }).exec();
    await this.expenseSchema.deleteMany({ userId: userFound._id }).exec();

    return userFound;
  }
}
