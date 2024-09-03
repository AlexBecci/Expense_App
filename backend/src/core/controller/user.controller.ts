import { Controller, Get, Param } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { User } from "../domain/user.entity";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async get_user(): Promise<User[]> {
        console.log('ENTRANDO AL USERs')
        return this.userService.get_users()
    }

    @Get(':id')
    async get_user_by_id(@Param('id') id: number): Promise<User> {
        return this.userService.get_user(id)
    }
}