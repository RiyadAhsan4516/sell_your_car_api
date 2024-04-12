import { Injectable } from "@nestjs/common";
import { Repository, SelectQueryBuilder } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()

export class UsersRepository {
  constructor(@InjectRepository(User) private repo: Repository<User>) {
  }

  async create(email: string, password: string) : Promise<{[key: string] : string}>{
     await this.repo.createQueryBuilder()
      .insert()
      .into(User)
      .values({ email, password })
      .execute();

    return {message : "New User created"}
  }

  async getMany(email : string | null = null) {
    let query: SelectQueryBuilder<User> = this.repo.createQueryBuilder()
    if(email) query = await this.addQuery(email, query)
    return query.maxExecutionTime(1000).getMany()
  }

  async getOne(id: number){
    return await this.repo.createQueryBuilder()
      .select(["User.id", "User.email", "User.password"])
      .where("User.id = :id", {id})
      .maxExecutionTime(1000)
      .getOne()
  }

  async updateUser(id: number, payload: Partial<User>): Promise<string> {
    await this.repo.createQueryBuilder()
      .update()
      .set(payload)
      .where("id = :id", { id })
      .execute();

    return "user information has been updated";
  }

  async deleteUser(id: number){
    await this.repo.createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", {id})
      .execute()

    return "user has been removed"
  }

  async addQuery (email : string | null, query : SelectQueryBuilder<User>){
    if(email) query = query.andWhere("User.email LIKE :email", {email : `%${email}%`})
    return query
  }
}















