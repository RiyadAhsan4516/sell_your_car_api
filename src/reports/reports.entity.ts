import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'reports'})
export class Reports {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: "int", nullable: false})
  price: number
}