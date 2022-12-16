import { Component, EventEmitter, Input, OnInit, Output, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ICategory } from 'src/app/interfaces/category';
import { createCategory, updateCategory } from 'src/app/store/actions/category.actions';
import { IAppState } from 'src/app/store/reducers';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

  title: string = "Create category";
  @Input()
  category?: ICategory;

  @Input()
  isOpen: boolean = false;

  @Output()
  onFormClose = new EventEmitter();

  constructor(private store: Store<IAppState>) { }

  @ViewChild('categoryForm') categoryForm!: NgForm;

  categoryFormGroup!: FormGroup;

  ngOnInit(): void {
    this.initializeCategoryForm();
  }
  initializeCategoryForm(): void {
    this.categoryFormGroup = new FormGroup({
      description: new FormControl(this.category?.description || "", Validators.required),
      slug: new FormControl(this.category?.slug || "", Validators.required),
      id: new FormControl(this.category?.id || "")
    });

    this.categoryFormGroup.get("description")?.valueChanges.subscribe(value => {
      this.categoryFormGroup.get("slug")?.setValue(value.replace(/ /g, "-"));
    })
  }

  onSubmit(): void {
    if(this.category == undefined)
      this.store.dispatch(createCategory({ category: this.categoryFormGroup.value }))
    else
      this.store.dispatch(updateCategory({category: this.categoryFormGroup.value}))  

    this.onFormClose.emit();
  }
  submitForm() {
    this.categoryForm.ngSubmit.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.initializeCategoryForm();

  }

  closeForm(): void {
    this.onFormClose.emit();
  }
}
