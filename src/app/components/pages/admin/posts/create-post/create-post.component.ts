import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ICategory } from 'src/app/interfaces/category';
import { ITag } from 'src/app/interfaces/tag';
import { getAllCategories } from 'src/app/store/actions/category.actions';
import { createPost } from 'src/app/store/actions/post.actions';
import { getAllTags } from 'src/app/store/actions/tag.actions';
import { IAppState } from 'src/app/store/reducers';
import { selectAllCategories } from 'src/app/store/selectors/category.selector';
import { selectAllTags } from 'src/app/store/selectors/tag.selectors';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {


  constructor(private store: Store<IAppState>, private router:Router) { }

  ngOnInit(): void {  
    
  }

  onCreated():void{
    this.router.navigate(["./admin/posts"]);
  }
}
