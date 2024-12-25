import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseBooksComponent } from './showcase-books.component';

describe('ShowcaseBooksComponent', () => {
  let component: ShowcaseBooksComponent;
  let fixture: ComponentFixture<ShowcaseBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowcaseBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
