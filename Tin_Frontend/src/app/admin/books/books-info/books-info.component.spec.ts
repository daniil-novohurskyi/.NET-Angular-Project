import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksInfoComponent } from './books-info.component';

describe('BooksInfoComponent', () => {
  let component: BooksInfoComponent;
  let fixture: ComponentFixture<BooksInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
