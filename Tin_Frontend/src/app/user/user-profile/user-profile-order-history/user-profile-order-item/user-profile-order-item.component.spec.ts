import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileOrderItemComponent } from './user-profile-order-item.component';

describe('UserProfileOrderItemComponent', () => {
  let component: UserProfileOrderItemComponent;
  let fixture: ComponentFixture<UserProfileOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileOrderItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
