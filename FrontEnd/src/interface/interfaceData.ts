export interface Users{
    id:number,
    picture : string,
    fullname :string,
    nickname : string,
    profile_articel: string,
    password :string,
    email :string
  }
  
  export interface ThreadsCards{
    id:number,
    users:Users,
    picture : string,
    postDate :string,
    articel: string,
    like :number,
    replice :number
  }

  export interface IValidation{
    fullname: string,
    nickname: string,
    email: string,
    password: string,
  }
  
  