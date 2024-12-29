import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUpsertAddBookDialogComponent } from './order-upsert-add-book-dialog.component';

describe('OrderUpsertAddBookDialogComponent', () => {
  let component: OrderUpsertAddBookDialogComponent;
  let fixture: ComponentFixture<OrderUpsertAddBookDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderUpsertAddBookDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderUpsertAddBookDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
