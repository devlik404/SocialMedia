import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Users } from "./Users";




@Entity({name:"follows"})
export class Follows {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Users,(users) => users.replies,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
        
    })
  users:Users;




}