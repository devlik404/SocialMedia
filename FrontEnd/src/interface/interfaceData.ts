export interface Users{
    id:number,
    picture: string,
    fullname:string,
    nickname: string,
    profile_articel: string,
    email :string
  }
  
  export interface ThreadsCards{
    id:number,
    users:Users,
    picture: string,
    postDate :Date,
    articel: string,
    isLike :boolean,
    likes_count:number,
    replies :number,
  }

  export interface IValidation{
    fullname: string,
    nickname: string,
    email: string,
    password: string,
  }
  
  export interface ILoginFrom{
    email: string,
    password: string,
  }
  

export  interface IthreadPost {
    article?:string,
    picture?: any | Blob | MediaSource
}

export  interface IReplies {
  thread_id:Number,
  articel:string
}
export  interface IReply {
  thread_id:Number,
  articel:string,
  users:Users,
  
}