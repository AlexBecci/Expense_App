import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class create_category_dto {

    @IsOptional()
    @IsString()
    name: string;

}
