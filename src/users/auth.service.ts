import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { User } from "./user.entity";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {
  }

  async signUp(email: string, password: string): Promise<{[key: string] : string}> {
    let user = await this.usersService.getMany(email);
    if (user.length > 0) throw new BadRequestException("A user already exists with this id");

    // GENERATE A SALT
    const salt: string = randomBytes(8).toString("hex");

    // GENERATE HASH USING THE SALT
    const hash: Buffer = (await scrypt(password, salt, 32)) as Buffer; // typescript does not understand what scrypt returns
    // So we executed the code telling typescript that it will come out as a buffer

    // Join the hash and the salt together to make up the password
    const result: string = `${salt}.${hash.toString("hex")}`;

    // Now create the user
    return await this.usersService.create(email, result);

  }

  async signIn(email: string, password: string) {
    let user: User[] | User= await this.usersService.getMany(email);
    if (user.length < 1) throw new UnauthorizedException("Email or password incorrect");
    user = user[0];

    const [salt, storedHash] = user.password.split(".")

    let hash : Buffer = (await scrypt(password, salt, 32)) as Buffer

    if(hash.toString("hex") === storedHash) return {message : "Logged in!"}

    else throw new UnauthorizedException("Email or password incorrect")
  }
}
