import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { ICategory } from 'src/app/interfaces/category';
import { IPost } from 'src/app/interfaces/post';
import { ITag } from 'src/app/interfaces/tag';
import { getAllCategories } from 'src/app/store/actions/category.actions';
import { createPost, updatePost } from 'src/app/store/actions/post.actions';
import { getAllTags } from 'src/app/store/actions/tag.actions';
import { IAppState } from 'src/app/store/reducers';
import { selectAllCategories } from 'src/app/store/selectors/category.selector';
import { selectAllTags } from 'src/app/store/selectors/tag.selectors';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  @Input()
  post?: IPost;
  tinyApiKey:string = environment.tinyApiKey;

  @Output()
  onPostFormSubmited = new EventEmitter();

  postFormGroup!: FormGroup;
  categories$!: ICategory[];
  tags$!: ITag[];
  constructor(private store: Store<IAppState>) { }

  ngOnInit(): void {
    this.initializePostFormGroup();
    this.store.pipe(select(selectAllCategories)).subscribe(data => {
      this.categories$ = data;

    })
    this.store.dispatch(getAllCategories());
    this.store.dispatch(getAllTags());
    this.store.pipe(select(selectAllTags)).subscribe(data => {
      this.tags$ = data;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.initializePostFormGroup();

  }

  initializePostFormGroup(): void {
    console.log("POST", this.post);

    this.postFormGroup = new FormGroup({
      id: new FormControl(this.post?.id || ""),
      title: new FormControl(this.post?.title || "", Validators.required),
      slug: new FormControl(this.post?.slug || "", Validators.required),
      image: new FormControl(this.post?.image || "", Validators.required),
      content: new FormControl(this.post?.content || "", Validators.required),
      categoriesId: new FormArray([]),
      tagsId: new FormArray([]),
    })

    this.postFormGroup.get("title")?.valueChanges.subscribe(value => {
      this.postFormGroup.get("slug")?.setValue(value.replace(/ /g, "-"))
    })

    if (this.post != undefined) {

      const categoriesFormArray: FormArray = this.postFormGroup.get("categoriesId") as FormArray;
      this.post.categories.forEach(cat => {
        categoriesFormArray.push(new FormControl(cat.id));
      })
      const tagsFormArray: FormArray = this.postFormGroup.get("tagsId") as FormArray;
      this.post.tags.forEach(t => {
        tagsFormArray.push(new FormControl(t.id));
      })
    }

  }

  checkIfCategoryIsInPostCategoriesIdList(id: string): boolean {
    const categoriesFormArray: FormArray = this.postFormGroup.get("categoriesId") as FormArray;
    let category = categoriesFormArray.controls.find(c => c.value == id);

    return category != undefined ? true : false;
  }
  checkIfTagIsInPostTagsIdList(id: string): boolean {
    const tagsFormArray: FormArray = this.postFormGroup.get("tagsId") as FormArray;
    let category = tagsFormArray.controls.find(t => t.value == id);

    return category != undefined ? true : false;
  }

  onSubmit() {
    if (this.postFormGroup.invalid) return;

    if (this.post == undefined)
      this.store.dispatch(createPost({ post: this.postFormGroup.value }));

    else
      this.store.dispatch(updatePost({ post: this.postFormGroup.value }));

    this.onPostFormSubmited.emit();

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


}
