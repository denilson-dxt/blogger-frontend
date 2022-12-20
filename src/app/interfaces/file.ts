import { IFolder } from "./folder";

export interface IFile{
    id:string;
    name:string;
    path:string;
    parentFolder:IFolder;
    createAt:Date;
    updatedAt:Date;

}