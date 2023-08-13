import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Users } from "./Users"
import { Replies } from "./Replies";
import { Likes } from "./Likes";


@Entity({name:"threads"})
export class Threads {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    picture: string;

    @Column()
    articel: string;

    @Column({type:"timestamp",default : () => "CURRENT_TIMESTAMP"})
    postDate: Date;

    @ManyToOne(()=> Users,(users) => users.threads,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
        
    })
    users:Users;
    
    @OneToMany(()=> Replies,(replies) => replies.threads,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
        
    })
    replies:Replies[];

    @OneToMany(()=> Likes,(likes) => likes.threads,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
        
    })
    likes:Likes[];



}