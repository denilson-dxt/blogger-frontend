import { ICategory } from "./category";
import { ITag } from "./tag";

export interface IPost{
    id:string;
    title:string;
    slug:string;
    publishedAt:Date;
    editedAt:Date;
    image:string;
    content:string;
    user:any;
    categories:ICategory[];
    tags: ITag[]

}