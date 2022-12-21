import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IPost } from 'src/app/interfaces/post';
import { getAllCategories } from 'src/app/store/actions/category.actions';
import { getAllPosts } from 'src/app/store/actions/post.actions';
import { getAllTags } from 'src/app/store/actions/tag.actions';
import { selectAllPosts } from 'src/app/store/selectors/post.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

posts:IPost[] = [];
  constructor(private store:Store) { }

  ngOnInit(): void {
    this.store.dispatch(getAllCategories())
    this.store.dispatch(getAllTags())
    this.store.dispatch(getAllPosts());
    this.store.pipe(select(selectAllPosts)).subscribe(posts => {
      this.posts = [...posts];
    })
  }

}
