import {Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards} from "@nestjs/common";
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {Serialize} from "../interceptors/serialize.interceptor";
import {UserDto} from "./dto/user.dto";
import {AuthService} from "./auth.service";
import {AuthGuard} from "../guards/auth.guard";
import {User} from "./user.entity";

@Controller("users")
export class UsersController {
    constructor(
        private userService: UsersService,
        private authService: AuthService
    ) {
    }

    @UseGuards(AuthGuard)
    @Get("/get_users")
    async getUsers(@Query('email') email: string, @Req() req: any): Promise<User[]> {
        return await this.userService.getMany(email)
    }

    @Serialize(UserDto)
    @Get("/get_user/:id")
    async getUser(@Param("id") id: number) : Promise<User> {
        return await this.userService.getOne(id)
    }

    @Post("/signup")
    async createUser(@Body() body: CreateUserDto): Promise<{ [key: string]: string }> {
        return await this.authService.signUp(body.email, body.password)
    }

    @Post("/sign_in")
    async signIn(@Body() body: CreateUserDto): Promise<{ [key: string]: string }> {
        return await this.authService.signIn(body.email, body.password)
    }

    @Put("/update_info/:id")
    async userUpdate(
        @Body() body: UpdateUserDto,
        @Param("id") id: number
    ): Promise<string> {
        return await this.userService.updateUser(id, body)
    }

    @Delete("/remove_user/:id")
    async userDelete(@Param("id") id: number) {
        return await this.userService.userRemove(id)
    }

}
