import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ITag } from 'src/app/interfaces/tag';
import { createTag, updateTag } from 'src/app/store/actions/tag.actions';
import { IAppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent implements OnInit {

  @ViewChild("tagForm") tagForm!:NgForm

  @Output()
  onFormClose = new EventEmitter();

  @Input()
  tag?:ITag;

  @Input()
  isOpen!:boolean;

  title:string = "Create tag";

  tagFormGroup!:FormGroup;
  constructor(private store:Store<IAppState>) { }

  ngOnInit(): void {
    this.initializeTagForm();

  }

  initializeTagForm(){
    this.tagFormGroup = new FormGroup({
      id: new FormControl(this.tag?.id || ""),
      description: new FormControl(this.tag?.description || "", Validators.required)
    })
  }

  ngOnChanges(changes: SimpleChanges){
    this.initializeTagForm();
  }

  onSubmit(){
    if(this.tagFormGroup.invalid) return;
    if(this.tag == undefined)
      this.store.dispatch(createTag({tag: this.tagFormGroup.value}));
    else
      this.store.dispatch(updateTag({tag: this.tagFormGroup.value}));
    this.closeForm();
  }
  submitForm(){
    this.tagForm.ngSubmit.emit();
  }

  closeForm(){
    this.onFormClose.emit();
  }
}
