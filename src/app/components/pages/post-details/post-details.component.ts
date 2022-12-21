import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IPost } from 'src/app/interfaces/post';
import { PostService } from 'src/app/services/post.service';
import { IAppState } from 'src/app/store/reducers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  host:string = environment.api;

  post?:IPost;
  constructor(private router: ActivatedRoute, private postService:PostService, private s:DomSanitizer) { }

  content:string = "";

  ngOnInit(): void {
    if(this.post == undefined){
      let slug!:string;
      this.router.params.subscribe(params => {
        slug = params["slug"];
      })
      this.postService.getPostBySlug(slug).subscribe(post => {
        
        this.post = post;
        this.content = this.post.content;
      })
    }
  }
  format(content:string){
    return this.s.bypassSecurityTrustHtml(content);
  }

}
