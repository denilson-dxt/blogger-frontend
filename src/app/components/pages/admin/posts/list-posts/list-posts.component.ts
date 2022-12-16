import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/interfaces/post';
import { getAllPosts } from 'src/app/store/actions/post.actions';
import { IAppState } from 'src/app/store/reducers';
import { selectAllPosts } from 'src/app/store/selectors/post.selectors';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  filteredPosts!:IPost[];
  posts!:Observable<IPost[]>;

  search:string = "";
  constructor(private store:Store<IAppState>) { }

  ngOnInit(): void {
    this.store.dispatch(getAllPosts());
    this.posts = this.store.pipe(select(selectAllPosts));
    this.posts.subscribe(data=>{
      this.filteredPosts = data;
    })
  }

  onSearchInputChange(event$:any){

  }

}
