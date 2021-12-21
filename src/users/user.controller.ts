import { Controller, Get, Req, Delete, Put } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get all users
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  // get user by id
  @Get("/:id")
  async getUserById(@Req() req) {
    return this.userService.filterUser(
      await this.userService.getUserById(req.params.id)
    );
  }

  // get user by google id
  @Get("google/:googleId")
  async getUserByGoogleId(@Req() req) {
    return this.userService.filterUser(
      await this.userService.getUserByGoogleId(req.params.googleId)
    );
  }

  // get user by github id
  @Get("github/:githubId")
  async getUserByGithubId(@Req() req) {
    return this.userService.filterUser(
      await this.userService.getUserByGithubId(req.params.githubId)
    );
  }

  // update user
  @Put("/:id")
  async updateUser(@Req() req) {
    return await this.userService.updateUser(req.params.id, req.body);
  }

  // delete user
  @Delete("/:id")
  async deleteUser(@Req() req) {
    return await this.userService.deleteUser(req.params.id);
  }
}
