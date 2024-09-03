import { IsBoolean, IsDecimal, IsOptional, IsString } from "class-validator";

export class update_user_dto {

    @IsOptional()
    @IsString()
    usuario?: string;

    @IsOptional()
    @IsString()
    password?: string

    @IsOptional()
    @IsBoolean()
    state_?: boolean;

    @IsOptional()
    @IsDecimal()
    balance?: number

    @IsOptional()
    @IsString()
    nombre?: string;

}