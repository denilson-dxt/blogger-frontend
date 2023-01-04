import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPostsByTagComponent } from './list-posts-by-tag.component';

describe('ListPostsByTagComponent', () => {
  let component: ListPostsByTagComponent;
  let fixture: ComponentFixture<ListPostsByTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPostsByTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPostsByTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
