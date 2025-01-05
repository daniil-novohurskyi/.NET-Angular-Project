import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartListItemComponent} from '../../../cart-order/cart/cart-list-item/cart-list-item.component';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {OrderUpsertAddBookDialogComponent} from './order-upsert-add-book-dialog/order-upsert-add-book-dialog.component';
import {
  OrderUpsertAddClientDialogComponent
} from './order-upsert-add-client-dialog/order-upsert-add-client-dialog.component';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AddClientService} from './order-upsert-add-client-dialog/add-client.service';
import {ClientModel} from './order-upsert-add-client-dialog/client-list/client-item/client-item.model';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderUpsertService} from './order-upsert.service';
import {AddBookService} from './order-upsert-add-book-dialog/add-book.service';
import {OrderItemModel} from '../../../models/order-item/order-item.model';
import {OrderUpsertRequestModel} from '../../../models/orders/order-upsert-request.model';
import {OrderItemUpsertRequest} from '../../../models/order-item/order-item-upsert-request.model';

@Component({
  selector: 'app-order-upsert',
  standalone: true,
  imports: [
    CartListItemComponent,
    NgForOf,
    MatDialogModule,
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  templateUrl: './order-upsert.component.html',
  styleUrl: './order-upsert.component.css'
})
export class OrderUpsertComponent implements OnInit, OnDestroy {
  mode: 'update' | 'create' = 'create';
  public isSubmited = false;
  showComponent = false;
  addClientSub : any;
  addBookSub: any;

  public pickedCustomer:ClientModel = {
    id:0,
    email:"",
    name:"",
    phone:"",
  };

  deliveryGroup: FormGroup;
  orderForm: FormGroup;

  constructor(private matDialog: MatDialog,
              protected orderUpsertService:OrderUpsertService,
              private addClientService: AddClientService,
              private AddBookService:AddBookService,
              private route: ActivatedRoute,
              private router: Router) {
    this.deliveryGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      unit: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required])
    });
    this.orderForm = new FormGroup({
      status: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required])
    })
  }

  ngOnDestroy(): void {
    this.addBookSub.unsubscribe();
    this.orderForm.reset();
    this.deliveryGroup.reset();
    this.addBookSub.unsubscribe();
    this.orderUpsertService.orderUpsertModel.orderItems = [];
    this.AddBookService.pickedOrderItems = [];
   }

  ngOnInit(): void {
    this.AddBookService.resetOrderItems();
    this.addClientSub = this.addClientService.customer$.subscribe(customer => {
      this.pickedCustomer = customer!;
    });
    this.addBookSub = this.AddBookService.orderItems$.subscribe(orderItems => {
      if (!this.orderUpsertService.orderUpsertModel) {
        this.orderUpsertService.orderUpsertModel = {
          client: {email: '', id: 0, name: ''},
          deliveryDetails: {city: '', name: '', phone: '', postalCode: '', street: '', unit: 0},
          orderDetails: {date: '', id: '', status: '', totalPrice: 0},
          orderItems: [] // Initialize with an empty array
          // Add other default properties if required
        };
      }
      if(this.orderUpsertService.orderUpsertModel.client.id !=0){

      }
      const items = [...orderItems.filter(item => item.quantity > 0)]; // Use nullish coalescing for safety
      this.orderUpsertService.orderUpsertModel.orderItems = this.orderUpsertService.orderUpsertModel.orderItems.concat(items);
      this.orderUpsertService.orderUpsertModel.orderDetails.totalPrice = 0
      this.orderUpsertService.orderUpsertModel.orderItems.forEach(orderItem => {
        this.orderUpsertService.orderUpsertModel.orderDetails.totalPrice += orderItem.price;
      })
    });

    const isUpdate = this.route.snapshot.paramMap.has('id');  // Проверяем, есть ли параметр 'id' в URL
    this.mode = !isUpdate ? 'create' : 'update';

    if(this.mode === 'update') {
      this.route.data.subscribe(data=>{
        this.orderUpsertService.orderUpsertModel = data["orderUpsert"];
      });
    }else{
      setTimeout(() => {
      }, 1);
    }

    if(this.mode === 'update') {
      this.pickedCustomer = {
        id: this.orderUpsertService.orderUpsertModel.client.id,
        name: this.orderUpsertService.orderUpsertModel.client.name,
        email:this.orderUpsertService.orderUpsertModel.client.email,
        phone:""
      }
      this.deliveryGroup.setValue({
        name: this.orderUpsertService.orderUpsertModel.deliveryDetails.name,
        phone: this.orderUpsertService.orderUpsertModel.deliveryDetails.phone,
        city: this.orderUpsertService.orderUpsertModel.deliveryDetails.city,
        street: this.orderUpsertService.orderUpsertModel.deliveryDetails.street,
        unit: this.orderUpsertService.orderUpsertModel.deliveryDetails.unit,
        postalCode: this.orderUpsertService.orderUpsertModel.deliveryDetails.postalCode,
      })
      this.orderForm.setValue({
        status: this.orderUpsertService.orderUpsertModel.orderDetails.status,
        date: this.orderUpsertService.orderUpsertModel.orderDetails.date
      })
    }


  }

  openAddBookDialog(): void {
    console.log(this.orderUpsertService.orderUpsertModel.orderItems);
    this.matDialog.open(OrderUpsertAddBookDialogComponent);
  }
  openAddClientDialog(): void {
    this.addClientService.getUsers();
    this.matDialog.open(OrderUpsertAddClientDialogComponent);
  }

  OnMinusItem(item: OrderItemModel) {
    item.quantity = item.quantity - 1;
    item.price = item.pricePerUnit * item.quantity;
    this.orderUpsertService.orderUpsertModel.orderDetails.totalPrice -=item.pricePerUnit;

    if(item.quantity == 0){
      const index = this.orderUpsertService.orderUpsertModel.orderItems.indexOf(item);
      if (index > -1) {
        this.orderUpsertService.orderUpsertModel.orderItems.splice(index, 1);
      }
    }
  }

  OnPlusItem(item: OrderItemModel) {
    item.quantity = item.quantity + 1;
    item.price = item.pricePerUnit * item.quantity;
    this.orderUpsertService.orderUpsertModel.orderDetails.totalPrice +=item.pricePerUnit;
  }


  OnSubmit() {
    this.isSubmited = true;
    // Сброс сообщений об ошибках (если они есть)
    let hasError = false;

    // Проверка на валидность форм
    if (!this.deliveryGroup.valid || !this.orderForm.valid) {
      hasError = true;
    }

    // Проверка, что клиент выбран
    if (!this.pickedCustomer) {
      hasError = true;
    }

    // Проверка, что книги добавлены
    if (this.orderUpsertService.orderUpsertModel.orderItems.length === 0) {
      hasError = true;
    }

    // Если есть ошибки, остановить выполнение
    if (hasError) return;

    // Формируем данные для отправки
    const orderUpsertRequest: OrderUpsertRequestModel = {
      date: this.orderForm.get('date')?.value,
      deliveryDetails: {
        city: this.deliveryGroup.get('city')?.value,
        name: this.deliveryGroup.get('name')?.value,
        phone: this.deliveryGroup.get('phone')?.value,
        postalCode: this.deliveryGroup.get('postalCode')?.value,
        street: this.deliveryGroup.get('street')?.value,
        unit: +this.deliveryGroup.get('unit')?.value,
      },
      orderItems: this.orderUpsertService.orderUpsertModel.orderItems.map<OrderItemUpsertRequest>(
        (orderItem) => ({
          isbn: orderItem.isbn,
          quantity: orderItem.quantity,
        })
      ),
      status: this.orderForm.get('status')?.value,
      userId: this.pickedCustomer.id,
      totalPrice: this.orderUpsertService.orderUpsertModel.orderDetails.totalPrice
    };

    console.log("Submitting order:", orderUpsertRequest);

    if (this.mode === 'update') {
      const orderId = this.route.snapshot.params['id'];
      // Обновление заказа
      this.orderUpsertService.updateOrder(orderId, orderUpsertRequest);
    } else {
      // Создание нового заказа
      this.orderUpsertService.createOrder(orderUpsertRequest);
    }
    setTimeout(()=>{
    this.router.navigate(['admin/orders']);
    },100);
  }
}
