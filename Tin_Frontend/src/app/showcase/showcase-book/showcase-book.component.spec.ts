import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseBookComponent } from './showcase-book.component';

describe('ShowcaseBookComponent', () => {
  let component: ShowcaseBookComponent;
  let fixture: ComponentFixture<ShowcaseBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowcaseBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
