import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(private usersRepo : UsersRepository) {}

  async create(email: string, password: string): Promise<{ [key: string] : string }>{
    return await this.usersRepo.create(email, password);
  }

  async getMany(email : string | null = null): Promise<User[]>{
    return await this.usersRepo.getMany(email)
  }

  async getOne(id: number){
    return await this.usersRepo.getOne(id)
  }

  async updateUser(id: number, payload : Partial<User>) : Promise<string>{
    let user : User = await this.usersRepo.getOne(id)
    if(!user) throw new NotFoundException("No user exists with the provided id")
    return await this.usersRepo.updateUser(id, payload)
  }

  async userRemove(id: number){
    return await this.usersRepo.deleteUser(id)
  }

}
