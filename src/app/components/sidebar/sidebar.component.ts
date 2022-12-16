import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/reducers';
import { selectToggleSideBar } from 'src/app/store/selectors/configs.selector';

export interface ILink {
  name: string,
  href: string;
  children: ILink[];
  icon?: string;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  links: ILink[] = [
    {
      name: "Posts", href: "./admin/posts/list", children: [
        {name: "List", href: "./admin/posts/list", children:[]},
        { name: "Create new ", href: "./admin/posts/create", children: [] }
      ]
    },
    { name: "Categories", href: "./admin/categories", children: [] },
    {name: "Tags", href: "./admin/tags", children: []}
  ]

  visible: string = "flex";
  openSideBar$!: boolean;
  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.store.pipe(select(selectToggleSideBar)).subscribe(data => {
      this.openSideBar$ = data;
    })
  }

}
