import { IsNotEmpty, IsString } from 'class-validator';

export class login_dto {
    @IsString()
    @IsNotEmpty()
    usuario: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}


