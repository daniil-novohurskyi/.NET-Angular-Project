import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseBookCardComponent } from './showcase-book-card.component';

describe('ShowcaseBookCardComponent', () => {
  let component: ShowcaseBookCardComponent;
  let fixture: ComponentFixture<ShowcaseBookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowcaseBookCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowcaseBookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
