import { forwardRef, Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { userSchema } from "./user.model";
import { UserService } from "./user.service";
import { CategoryModule } from "../category/category.module";
import { TransactionsModule } from "../transactions/transactions.module";
import { ExpensesModule } from "../expenses/expenses.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: userSchema }]),
    forwardRef(() => CategoryModule),
    forwardRef(() => TransactionsModule),
    forwardRef(() => ExpensesModule),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [MongooseModule],
})
export class UserModule {}
