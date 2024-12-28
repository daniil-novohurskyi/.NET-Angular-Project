import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersInfoTableComponent } from './users-info-table.component';

describe('UsersInfoTableComponent', () => {
  let component: UsersInfoTableComponent;
  let fixture: ComponentFixture<UsersInfoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersInfoTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersInfoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
