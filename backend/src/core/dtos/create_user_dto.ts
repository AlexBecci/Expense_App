import { IsNotEmpty, IsString } from 'class-validator';

export class create_user_dto {
    @IsNotEmpty()
    @IsString()
    usuario: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    nombre: string;

}
