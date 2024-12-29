import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUpsertAddClientDialogComponent } from './order-upsert-add-client-dialog.component';

describe('OrderUpsertAddClientDialogComponent', () => {
  let component: OrderUpsertAddClientDialogComponent;
  let fixture: ComponentFixture<OrderUpsertAddClientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderUpsertAddClientDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderUpsertAddClientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
