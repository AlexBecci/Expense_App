import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Expense } from "../domain/expense.entity";
import { ExpenseController } from "../controller/expense.controller";
import { ExpenseService } from "../services/expense.service";

@Module({
    imports: [TypeOrmModule.forFeature([Expense])],
    controllers: [ExpenseController],
    providers: [ExpenseService],
    exports: [ExpenseService],
})

export class ExpenseModule { }