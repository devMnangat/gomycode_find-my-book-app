// user interface
export interface IUser {
    name: string;
    email: string;
    password?: string;
    createdAt: Date;
    updatedAt: Date;
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
  