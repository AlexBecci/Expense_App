import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class create_expense_dto {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number

    @IsDate()
    @Type(() => Date)
    @IsOptional() // La fecha puede ser opcional en el DTO de creación si no se proporciona
    date?: Date;

    @IsInt()
    @IsNotEmpty()
    userId: number

    @IsInt()
    @IsNotEmpty()
    categoryId: number
}