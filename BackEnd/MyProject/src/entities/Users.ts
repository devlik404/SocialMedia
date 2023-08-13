import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Threads } from "./Threads"
import { Replies } from "./Replies";
import { Follows } from "./Follows";
import { Likes } from "./Likes";


@Entity({name:"users"})
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;

    @Column()
    fullname: string;
    
    
    @Column()
    email: string;

    @Column({select:false})
    password: string;

    @Column({nullable:true})
    picture: string;
    
    @Column({nullable:true})
    profile_articel: string;

    @OneToMany(()=> Threads,(threads) => threads.users,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
        
    })
    threads:Threads[];
    
    @OneToMany(()=> Replies,(replies) => replies.users,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
        
    })
    replies:Replies[];

    @OneToMany(()=> Follows,(follows) => follows.users,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
        
    })
    follows:Follows[];

    @OneToMany(()=> Likes,(likes) => likes.users,{
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
        
    })
    likes:Likes[];



}