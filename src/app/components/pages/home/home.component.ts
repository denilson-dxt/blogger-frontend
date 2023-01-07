import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { IPost } from 'src/app/interfaces/post';
import { getAllCategories } from 'src/app/store/actions/category.actions';
import { changePagination, getAllPosts } from 'src/app/store/actions/post.actions';
import { getAllTags } from 'src/app/store/actions/tag.actions';
import { IPaginationState } from 'src/app/store/reducers/post.reducers';
import {selectAllPosts, selectPostsPagination} from 'src/app/store/selectors/post.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: IPost[] = [];
  pagination:IPaginationState = {
    actualPage: 1,
    totalPosts: 0,
    maxPostsPerPage: 0
  };
  constructor(private store: Store, private viewPort:ViewportScroller) { }

  ngOnInit(): void {
    this.getPosts();
    this.store.pipe(select(selectAllPosts)).subscribe(posts => {
      this.posts = [...posts];
    })
    this.store.pipe(select(selectPostsPagination)).subscribe(pagination => {
      this.pagination = pagination;
    });
  }

  async onPageChange(event:any){
    console.log(event);
    
    this.store.dispatch(changePagination({pagination: {actualPage: event.page+1, totalPosts: 0, maxPostsPerPage: 3}}))
    this.viewPort.scrollToPosition([0, 0]);
  }
  getPosts():void{
    this.store.dispatch(getAllPosts());
    
  }
}
