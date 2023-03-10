import { ICategory } from "./category";
import { IComment } from "./comment";
import { ITag } from "./tag";

export interface IPost{
    id:string;
    title:string;
    shortDescription:string;
    slug:string;
    publishedAt:Date;
    editedAt:Date;
    image:string;
    content:string;
    user:any;
    categories:ICategory[];
    tags: ITag[];
    comments:IComment[];
}