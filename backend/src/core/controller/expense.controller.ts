import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ExpenseService } from "../services/expense.service";
import { create_expense_dto } from "../domain/dtos/expense/create_expense_dto";
import { Expense } from "../domain/expense.entity";
import { update_expense_dto } from "../domain/dtos/expense/update/update_expense_dto";

@Controller('expenses')
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) { }

    //CRUD
    @Get()
    async get_expenses(): Promise<Expense[]> {
        return await this.expenseService.get_expenses()
    }

    @Get(':id')
    async get_user_by_id(@Param('id') id: number): Promise<Expense> {
        return this.expenseService.get_expense(id)
    }

    @Post()
    async create_expense(@Body() expense_dto: create_expense_dto): Promise<Expense> {
        return await this.expenseService.create_expense(expense_dto)
    }

    @Put(':id')
    async update_expense(@Param('id') id: number, @Body() expense_dto: update_expense_dto): Promise<Expense> {
        return await this.expenseService.update_expense(id, expense_dto)
    }

}