import { ConflictException, Injectable } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { JwtService } from "@nestjs/jwt";
import { User } from "../domain/user.entity";
import * as bcrypt from 'bcrypt';
import { create_user_dto } from "../domain/dtos/user/create_user_dto";
import { update_user_dto } from "../domain/dtos/user/update/update_user_dto";
/* import { crear_usuario_dto } from "../dtos/crear_usuario_dto"; */

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        try {
            const usuario = await this.userService.get_user_by_name(username)
            if (usuario instanceof User && usuario.password && (await this.comparePassword(password, usuario.password))) {
                const { password, ...result } = usuario;
                return { ...result, id: usuario.id }
            }
            return null;
        } catch (error) {
            console.error(error)
            return null
        }
    }

    async login(usuario: User) {
        console.log('entrando al login')
        const payload = { usuario: usuario.usuario, sub: usuario.usuario }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async register(user: create_user_dto): Promise<any> {
        const user_found = await this.userService.get_user_by_name(user.usuario)
        console.log(user_found)
        if (user_found !== null) {
            throw new ConflictException("Usuario ya existente")
        }
        const hashedPassword = await bcrypt.hash(user.password, 10)
        console.log(hashedPassword)
        const new_user = await this.userService.create_user({
            usuario: user.usuario,
            password: hashedPassword,
            nombre: user.nombre
        })
        return new_user
    }

    async update(id: number, user_dto: update_user_dto): Promise<User> {
        const body_update = this.userService.update_user(id, user_dto)
        return body_update
    }

    private async comparePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainTextPassword, hashedPassword)
    }
}