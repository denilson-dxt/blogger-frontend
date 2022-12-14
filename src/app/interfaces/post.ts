import { ICategory } from "./category";
import { ITag } from "./tag";

export interface IPost{
    id:string;
    title:string;
    image:string;
    content:string;
    user:any;
    categories:ICategory[];
    tags: ITag[]

}