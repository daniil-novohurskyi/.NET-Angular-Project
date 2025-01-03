import {Component, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule,} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {
  ShowcaseBookCardComponent
} from '../../../showcase/showcase-books/showcase-book-card/showcase-book-card.component';
import {BookUpsertService} from './book-upsert.service';
import {BookCardModel} from '../../../showcase/showcase-books/showcase-book-card/book-card.model';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-book-upsert',
  templateUrl: './book-upsert.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ShowcaseBookCardComponent,
    CommonModule
  ],
  styleUrls: ['./book-upsert.component.css']
})
export class BookUpsertComponent implements OnInit {
  @Input() mode!: 'update' | 'create';
  @Output() bookCardModel!: BookCardModel;
  private bookCardModelSubject = new BehaviorSubject<BookCardModel | null>(null);
  imageUrl$ = this.bookCardModelSubject.asObservable();

  bookForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private bookUpsertService: BookUpsertService,private route: ActivatedRoute) {
    this.route.url.subscribe(urlSegments => {
      if (urlSegments.length > 0) {
        // Get the last segment
        const action = urlSegments[urlSegments.length - 1].path;
        this.mode = action === 'new' ? 'create' : 'update';
      }})
    // Initialize the form manually
    this.bookForm = new FormGroup({
      title: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      publishingYear: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{4}$') // Only allows 4-digit years
      ]),
      description: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)])
    });
  }

  ngOnInit(){

    if(this.mode === 'update') {
      this.route.data.subscribe(data => {
        this.bookUpsertService.bookUpsert = data['bookUpsert'];
        console.log(this.bookUpsertService.bookUpsert);
      });
    }
    this.bookCardModel = {
      id: "",
      title: "",
      price:null,
      coverUrl:this.bookUpsertService.bookUpsert.coverUrl,
    }
    this.bookCardModelSubject.next(this.bookCardModel);

    console.log(this.bookUpsertService.bookUpsert);
    console.log(this.bookUpsertService.bookUpsert.publishingYear);
    if(this.mode === 'update') {
      this.bookCardModel.coverUrl = this.bookUpsertService.bookUpsert.coverUrl;
      console.log("Loaded:", this.bookCardModel.coverUrl);
      this.bookForm.setValue({
        title:this.bookUpsertService.bookUpsert.title,
        genre:this.bookUpsertService.bookUpsert.genre,
        author:this.bookUpsertService.bookUpsert.author,
        publishingYear: this.bookUpsertService.bookUpsert.publishingYear,
        description:this.bookUpsertService.bookUpsert.description,
        price:this.bookUpsertService.bookUpsert.price
      })
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
    const imageUrl = URL.createObjectURL(this.selectedFile!);
    this.bookCardModel = {
      id: "",
      title: "",
      price:null,
      coverUrl: imageUrl,
    }
    this.bookCardModelSubject.next(this.bookCardModel);
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      const formData = new FormData();
      Object.keys(this.bookForm.controls).forEach((key) => {
        formData.append(key, this.bookForm.get(key)?.value);
      });
      if (this.selectedFile) {
        formData.append('cover', this.selectedFile);
      }
      if(this.mode == "update"){
        const bookId = this.route.snapshot.params['id'];
        console.log("Updating");
        this.bookUpsertService.updateBook(bookId,formData);
      }else {
        this.bookUpsertService.createBook(formData);
      }
      // Handle form submission (e.g., send `formData` to API)
      formData.forEach((value, key) => {
        console.log( key,': ', value);
      })
    }
  }
}
