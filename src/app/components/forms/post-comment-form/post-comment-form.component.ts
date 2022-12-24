import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-comment-form',
  templateUrl: './post-comment-form.component.html',
  styleUrls: ['./post-comment-form.component.css']
})
export class PostCommentFormComponent implements OnInit {

  @Output()
  onFormSubmited = new EventEmitter<{content:string}>();

  formGroup!:FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(){
    this.formGroup = new FormGroup({
      content: new FormControl("", [Validators.required, Validators.minLength(3)])
    });
  }
  onCommentFormSubmmit() {
    if(this.formGroup.invalid) return;
    this.onFormSubmited.emit(this.formGroup.value);
    this.initializeForm();
  }
}
