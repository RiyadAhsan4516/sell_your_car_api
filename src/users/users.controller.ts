import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Serialize } from "../interceptors/serialize.interceptor";
import { UserDto } from "./dto/user.dto";

@Controller("users")
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get("/get_users")
  async getUsers(@Query('email') email : string, @Req() req : any){
    console.log(req.query);
    return await this.userService.getMany(email)
  }


  @Serialize(UserDto)
  @Get("/get_user/:id")
  async getUser(@Param("id") id: number){
    return await this.userService.getOne(id)
  }

  @Post("/signup")
  async createUser(@Body() body: CreateUserDto) {
    await this.userService.create(body.email, body.password);
    return await this.userService.getMany();
  }

  @Put("/update_info/:id")
  async userUpdate(
    @Body() body: UpdateUserDto,
    @Param("id") id: number
  ) {
    return await this.userService.updateUser(id, body)
  }

  @Delete("/remove_user/:id")
  async userDelete(@Param("id") id: number){
    return await this.userService.userRemove(id)
  }

}
