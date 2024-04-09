import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "user"})
export class User {
  @PrimaryGeneratedColumn()
  id : number

  @Column({type: "varchar", length: 100, nullable : false, unique: true})
  email: string

  @Column({type: "varchar", nullable: false})
  password: string

}