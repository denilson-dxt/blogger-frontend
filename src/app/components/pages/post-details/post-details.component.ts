import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { IPost } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';
import { addComment, setActualPost } from 'src/app/store/actions/post.actions';
import { IAppState } from 'src/app/store/reducers';
import { selectActualPost } from 'src/app/store/selectors/post.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  host: string = environment.api;

  post?: IPost;
  constructor(private store: Store<IAppState>, private router: ActivatedRoute, private postService: PostService, private s: DomSanitizer) { }

  ngOnInit(): void {
    if (this.post == undefined) {
      let slug!: string;
      this.router.params.subscribe(params => {
        slug = params["slug"];
      })
      this.postService.getPostBySlug(slug).subscribe(post => {
        this.store.dispatch(setActualPost({ post: post }));
      })
    } else {
      this.store.dispatch(setActualPost({ post: this.post! }));
    }
    this.store.pipe(select(selectActualPost)).subscribe(post => {
      this.post = post;
    })

  }
  format(content: string) {
    return this.s.bypassSecurityTrustHtml(content);
  }

  onCommentFormSubmmit(value: { content: string }) {
    this.store.dispatch(addComment({ postId: this.post!.id, content: value.content }));
  }

}
