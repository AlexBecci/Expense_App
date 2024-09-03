import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../domain/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { create_user_dto } from "../domain/dtos/user/create_user_dto";
import { update_user_dto } from "../domain/dtos/user/update/update_user_dto";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) { }
    
    async get_users(): Promise<User[]> {
        return this.userRepository.find()
    }
    
    /* DTO */
    async get_user(id: number): Promise<any> {
        const user = await this.userRepository.findOne({
            where: {
                id
            }
        })
        if (!user) {
            throw new HttpException('usuario not found', HttpStatus.NOT_FOUND);
        }

        return user
    }

    async get_user_by_name(user: string) {
        const user_found = await this.userRepository.findOne({
            where: {
                usuario: user
            }
        })
        return user_found
    }

    async create_user(user: create_user_dto) {
        const new_user = await this.userRepository.create(user)
        new_user.fecha_creacion = new Date();
        return this.userRepository.save(new_user)
    }

    async update_user(id: number, user_dto: update_user_dto): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new NotFoundException(`User With Id ${id} not Found`)
        }

        if (user_dto.password) {
            //encriptar la nueva contraseña
            user_dto.password = await bcrypt.hash(user_dto.password, 10);
        }
        //merge the update values into the existing user entity
        Object.assign(user, user_dto)
        //save the update user

        return this.userRepository.save(user)

    }


    /*     async crear_usuario(user: crear_usuario_dto) {
            const usuarioExistente = await this.usuarioRepository.findOne({
                where: {
                    usuario: user.usuario
                }
            });
            if (usuarioExistente) {
                throw new HttpException('Usuario  existente', HttpStatus.CONFLICT);
            }
            const nuevo_usuario = this.usuarioRepository.create(user);
            nuevo_usuario.fecha_creacion = new Date();
            return this.usuarioRepository.save(nuevo_usuario);
        } */
}