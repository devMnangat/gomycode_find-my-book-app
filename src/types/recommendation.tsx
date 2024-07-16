import { Book } from "./book";
import { IUser } from "./user";

export interface IRecommendation {
    _id: string;
    user: string | IUser ;
    recommendedBooks: (string | Book)[];
    comment?: string;
  }
  
  export interface Query{
    params: {id: string};
  }
  