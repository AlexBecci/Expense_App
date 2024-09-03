import { Body, Controller, Get, Post, Session, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { create_user_dto } from "../dtos/create_user_dto";
import { login_dto } from "../dtos/login_dto";
/* import { crear_usuario_dto } from "../dtos/crear_usuario_dto";
import { logueo_dto } from "../dtos/logueo_dto"; */

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Post('register')
    async register(@Body() user_data: create_user_dto) {
        const user = await this.authService.register(user_data)
        return user
    }


    @Post('login')
    async login(@Body() logueo: login_dto, @Session() session: Record<string, any>) {
        const usuario = await this.authService.validateUser(logueo.usuario, logueo.password)
        if (!usuario) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        session.userId = usuario.id;
        return this.authService.login(usuario)
    }

    @Get('check_session')
    check_session(@Session() session: any): { message: string } {
        console.log(session)
        if (session && session.userId) {
            return { message: 'Acceso autorizado' }
        }
        else {
            // Lanza UnauthorizedException para devolver un código de estado 401
            throw new UnauthorizedException('Acceso no autorizado');
        }
    }

    @Get('logout')
    logout(@Session() session: Record<string, any>): { message: string } {
        if (!session.userId) {
            throw new UnauthorizedException('No ha iniciado session');
        }
        delete session.userId;
        return { message: 'Se deslogueo el usuario correctamente' }
    }
}