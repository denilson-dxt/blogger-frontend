import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IPost } from 'src/app/interfaces/post';
import { getPostsByCategory } from 'src/app/store/actions/post.actions';
import { IAppState } from 'src/app/store/reducers';
import { selectAllPosts } from 'src/app/store/selectors/post.selectors';

@Component({
  selector: 'app-list-posts-by-category',
  templateUrl: './list-posts-by-category.component.html',
  styleUrls: ['./list-posts-by-category.component.css']
})
export class ListPostsByCategoryComponent implements OnInit {

  posts:IPost[] = [];

  constructor(private store:Store<IAppState>, private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.store.pipe(select(selectAllPosts)).subscribe(posts => {
      this.posts = posts; 
    })

    this.router.params.subscribe(params => {
      let categorySlug:string = params["categorySlug"];
      this.store.dispatch(getPostsByCategory({categorySlug:categorySlug}))

    })
  }

}
