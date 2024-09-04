import { IsOptional, IsString } from "class-validator";

export class update_category_dto {
    @IsOptional()
    @IsString()
    name?: string;
}