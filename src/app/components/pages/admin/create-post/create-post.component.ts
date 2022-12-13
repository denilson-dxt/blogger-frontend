import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  postFormGroup!:FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.postFormGroup = new FormGroup({
      editor: new FormControl("", Validators.required)
    })
  }

  onSubmit(){
    console.log(this.postFormGroup.value);
    
  }

}
