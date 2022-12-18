import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IPost } from 'src/app/interfaces/post';
import { getAllPosts } from 'src/app/store/actions/post.actions';
import { IAppState } from 'src/app/store/reducers';
import { selectAllPosts } from 'src/app/store/selectors/post.selectors';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  post?:IPost;
  constructor(private store:Store<IAppState>, private route:ActivatedRoute) { }

  ngOnInit(): void {
    let id = "";
    this.route.params.subscribe(params => {
      id = params["id"];
    })
    this.store.dispatch(getAllPosts())
    this.store.pipe(select(selectAllPosts)).subscribe(posts => {      
      this.post = posts.find(p => p.id == id)
    })
  }

}
