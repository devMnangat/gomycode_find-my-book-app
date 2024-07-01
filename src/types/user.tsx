// user interface
export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  // query interface
  export interface Query{
    params: {id: string};
  }
  
//   interface for user registration
  export interface IUserInput {
    name: string;
    email: string;
    password: string;
  }
  
//   interface for user login
  export interface IUserLogin {
    email: string;
    password: string;
  }
  