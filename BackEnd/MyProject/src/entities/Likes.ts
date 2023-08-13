import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Users } from "./Users";
import { Threads } from "./Threads";




@Entity({name:"likes"})
export class Likes {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=> Users,(users) => users.likes,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
        
    })
  users:Users;

    @ManyToOne(()=> Threads,(threads) => threads.likes,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
        
    })
    threads:Threads;



}