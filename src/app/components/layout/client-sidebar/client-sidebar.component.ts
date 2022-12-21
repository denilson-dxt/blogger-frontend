import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ICategory } from 'src/app/interfaces/category';
import { ITag } from 'src/app/interfaces/tag';
import { IAppState } from 'src/app/store/reducers';
import { selectAllCategories } from 'src/app/store/selectors/category.selector';
import { selectAllTags } from 'src/app/store/selectors/tag.selectors';

@Component({
  selector: 'app-client-sidebar',
  templateUrl: './client-sidebar.component.html',
  styleUrls: ['./client-sidebar.component.css']
})
export class ClientSidebarComponent implements OnInit {
  
  categories:ICategory[] = [];
  tags:ITag[] = [];
  constructor(private store:Store<IAppState>) { }
  
  ngOnInit(): void {
    this.store.pipe(select(selectAllCategories)).subscribe(categories => {
      this.categories = categories;
    });

    this.store.pipe(select(selectAllTags)).subscribe(tags => {
      this.tags = tags;
    })

  }
  
  getImageAsBackgroundUrl(src: string): any {
    return `url('${src}')`;
  }
}
