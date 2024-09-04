import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class update_expense_dto {
    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    amount?: string;

    @IsOptional()
    @IsDate()
    date?: Date;
}