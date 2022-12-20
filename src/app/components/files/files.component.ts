import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IFile } from 'src/app/interfaces/file';
import { IFolder } from 'src/app/interfaces/folder';
import { toggleFilesModal } from 'src/app/store/actions/configs.actions';
import { getAllFiles, getAllFolders } from 'src/app/store/actions/files.actions';
import { IAppState } from 'src/app/store/reducers';
import { selectIsFileModalOpen } from 'src/app/store/selectors/configs.selector';
import { seelectAllFolders, selectAllFiles } from 'src/app/store/selectors/files.selector';
import { environment } from 'src/environments/environment';
import {Clipboard} from "@angular/cdk/clipboard";


interface IFolderNavItem{
  name:string;
  id:string;
}

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  isOpen!:boolean;
  constructor(private store:Store<IAppState>, private clipboard:Clipboard) { }

  filesHost!:string;

  folders!:IFolder[];
  files!:IFile[];

  navigation:IFolderNavItem[] = [{name: "ROOT", id: "root"}];

  ngOnInit(): void {
    this.filesHost = environment.api
    this.store.pipe(select(selectIsFileModalOpen)).subscribe(isOpen=>{
      this.isOpen = isOpen;
    })
    this.store.dispatch(getAllFolders({parentId: "root"}));
    this.store.dispatch(getAllFiles({parentId: "root"}));

    this.store.pipe(select(seelectAllFolders)).subscribe(folders => {
      this.folders = folders;
    })

    this.store.pipe(select(selectAllFiles)).subscribe(files => {
      this.files = files;
    })

  }

  closeModal():void{
    this.store.dispatch(toggleFilesModal());
  }
  isImage(file:string):boolean{
    return file.endsWith("png") || file.endsWith("jpg");
  }
  copyToClipboard(file:IFile):void{
    this.clipboard.copy(`${this.filesHost}/files/${file.path}`)
  }
  openFolder(folder:IFolder):void{
   if(folder == undefined){
    folder = {name: "Root", id: "root"};
   }
    
    this.navigation.push({name: folder.name, id: folder.id})

    this.store.dispatch(getAllFolders({parentId: folder.id}))
    this.store.dispatch(getAllFiles({parentId: folder.id}))
  }

  backToFolder(folder:IFolderNavItem):void{
    let index = this.navigation.indexOf(folder);
    let maxRemove = this.navigation.length - index;
    let navTemp = [...this.navigation];
    navTemp.splice(index, maxRemove);
    this.navigation = [...navTemp];
    
    this.openFolder({name: folder.name, id: folder.id})
  }
}
