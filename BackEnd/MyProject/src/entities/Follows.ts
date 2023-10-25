import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Users } from "./Users";




@Entity({name:"follows"})
export class Follows {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Users,(users) => users.follower,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
        
    })
    follower:Users;

    @ManyToOne(()=> Users,(users) => users.followed,{
      onDelete:"CASCADE",
      onUpdate:"CASCADE"
      
  })
  followed:Users;



}