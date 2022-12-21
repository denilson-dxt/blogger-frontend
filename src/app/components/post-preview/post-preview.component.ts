import { Component, Input, OnInit } from '@angular/core';
import { IPost } from 'src/app/interfaces/post';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})
export class PostPreviewComponent implements OnInit {
getUrl(): any {
  return `url('${this.post.image}')`
}

  @Input()
  post!:IPost;
  constructor() { }

  ngOnInit(): void {
  }

}
