import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Users } from "./Users";
import { Threads } from "./Threads";



@Entity({name:"replies"})
export class Replies {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    articel: string;

    @Column({type:"timestamp",default : () => "CURRENT_TIMESTAMP"})
    postDate: Date;

    @ManyToOne(()=> Users,(users) => users.replies,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
        
    })
    users:Users;

    @ManyToOne(()=> Threads,(threads) => threads.replies,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
        
    })
    threads:Threads;




}