import { Component, Input, OnInit } from '@angular/core';
import { ITag } from 'src/app/interfaces/tag';

@Component({
  selector: 'app-tag-form',
  templateUrl: './tag-form.component.html',
  styleUrls: ['./tag-form.component.css']
})
export class TagFormComponent implements OnInit {

  @Input()
  tag?:ITag;

  @Input()
  isOpen!:boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
