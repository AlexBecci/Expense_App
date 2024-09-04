import { InjectRepository } from "@nestjs/typeorm";
import { Expense } from "../domain/expense.entity";
import { Repository } from "typeorm";
import { HttpException, HttpStatus, NotFoundException } from "@nestjs/common";
import { create_expense_dto } from "../domain/dtos/expense/create_expense_dto";
import { update_expense_dto } from "../domain/dtos/expense/update/update_expense_dto";

export class ExpenseService {
    constructor(@InjectRepository(Expense) private expenseRepository: Repository<Expense>) { }


    //function que trae las expense
    async get_expenses(): Promise<Expense[]> {
        return this.expenseRepository.find()
    }

    //functino que trae expensa por id
    async get_expense(id: number): Promise<Expense> {
        const expense = await this.expenseRepository.findOne({ where: { id } })
        if (!expense) {
            throw new HttpException(`categoria ${id} not found`, HttpStatus.NOT_FOUND);
        }
        return expense
    }


    //functino que trae categoria por nombre
    /*  async get_expense_by_name(name:string){
         const expense = await this.expenseRepository.findOne({
             where:{
 
             }
         })
     } */

    //function que crea una expense
    async create_expense(expense: create_expense_dto): Promise<any> {
        /* const expense_found= await this. */
        console.log(expense)
        const new_expense = await this.expenseRepository.create(expense)
        return this.expenseRepository.save(new_expense)
    }

    //function que updatea un expense/gasto
    async update_expense(id: number, expense_dto: update_expense_dto): Promise<Expense> {
        const expense = await this.expenseRepository.findOneBy({ id })
        if (!expense) {
            throw new NotFoundException(`Expense With Id ${id} not Found`)
        }
        //merge the object
        Object.assign(expense, expense_dto)
        //save
        return this.expenseRepository.save(expense)
    }

}