import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Expense } from "../domain/expense.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Expense])],
    controllers: [],
    providers: [],
    exports: [],
})

export class ExpenseModule { }