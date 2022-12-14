import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TitleStrategy } from '@angular/router';
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

  postFormGroup!: FormGroup;
  categories$!: ICategory[];
  tags$!: ITag[];
  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.postFormGroup = new FormGroup({
      title: new FormControl("", Validators.required),
      slug:new FormControl("", Validators.required),
      image: new FormControl("", Validators.required),
      content: new FormControl("", Validators.required),
      categoriesId: new FormArray([]),
      tagsId: new FormArray([]),
    })
    this.store.dispatch(getAllCategories());
    this.store.pipe(select(selectAllCategories)).subscribe(data => {
      this.categories$ = data;
      console.log(data);

    })
    this.store.dispatch(getAllTags());
    this.store.pipe(select(selectAllTags)).subscribe(data => {
      this.tags$ = data;
    })
  }

  onSubmit() {
    if(this.postFormGroup.invalid) return;
    console.log(this.postFormGroup.value);
    this.store.dispatch(createPost({post: this.postFormGroup.value}));

  }
  onCategoriesCheckBoxChange($event: any) {
    const categoriesFormArray: FormArray = this.postFormGroup.get("categoriesId") as FormArray;
    if ($event.target.checked)
      categoriesFormArray.push(new FormControl($event.target.value))
    else {
      categoriesFormArray.removeAt(categoriesFormArray.controls.indexOf($event.target.value))
    }
    console.log(categoriesFormArray);
  }

  onTagsCheckboxChange($event: any) {
    const tagsFormArray: FormArray = this.postFormGroup.get("tagsId") as FormArray;
    if ($event.target.checked) {
      tagsFormArray.push(new FormControl($event.target.value));
      
    }
    else {
      tagsFormArray.removeAt(tagsFormArray.controls.indexOf($event.target.value));
    }
  }

  onTitleChange():void{
    let title = this.postFormGroup.get("title")?.value as string;
    title = title.replace(/ /g, "-")
    this.postFormGroup.get("slug")?.setValue(title);
    console.log(title);
    
  }

}
