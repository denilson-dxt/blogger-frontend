import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ITag } from 'src/app/interfaces/tag';
import { getAllTags } from 'src/app/store/actions/tag.actions';
import { IAppState } from 'src/app/store/reducers';
import { selectAllTags } from 'src/app/store/selectors/tag.selectors';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  selectedTag?:ITag;
  isTagFormOpen:boolean = false;  
  tags!:Observable<ITag[]>;
  filteredTags!:ITag[];

  search!:string;

  constructor(private store:Store<IAppState>) { }

  ngOnInit(): void {
    this.store.dispatch(getAllTags());
    this.tags = this.store.pipe(select(selectAllTags));
    this.tags.subscribe(data => {
      this.filteredTags = data;  
    })
  }

  closeTagForm(){
    this.isTagFormOpen = false; 
  }
  onSearchInputChange(event$:any){
    let value = event$.trim();
    console.log(value);
    this.tags?.subscribe(data => {
      this.filteredTags =  data.filter(cat => {
        return cat.description.includes(value);
      })
    })
  }

  onNewTag(){
    this.selectedTag = undefined;
    this.isTagFormOpen = true;
  }
  onDeleteTag(tagId:string){

  }
  onEditTag(tag:ITag){

  }
}
