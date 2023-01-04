import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IPost } from 'src/app/interfaces/post';
import { ITag } from 'src/app/interfaces/tag';
import { getPostsByTag } from 'src/app/store/actions/post.actions';
import { IAppState } from 'src/app/store/reducers';
import { selectAllPosts } from 'src/app/store/selectors/post.selectors';
import { selectAllTags } from 'src/app/store/selectors/tag.selectors';

@Component({
  selector: 'app-list-posts-by-tag',
  templateUrl: './list-posts-by-tag.component.html',
  styleUrls: ['./list-posts-by-tag.component.css']
})
export class ListPostsByTagComponent implements OnInit {

  tag?: ITag;
  posts: IPost[] = [];

  constructor(private store: Store<IAppState>, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      let tagDescription = params["tagDescription"];

      this.store.pipe(select(selectAllTags)).subscribe(tags => {
        this.tag = tags.find(t => t.description == tagDescription);
      });

      this.store.pipe(select(selectAllPosts)).subscribe(posts => {
        this.posts = posts;
      })
      this.store.dispatch(getPostsByTag({tagDescription: tagDescription}));

    })
  }

}
