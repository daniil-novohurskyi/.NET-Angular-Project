import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass, NgIf} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-upsert',
  templateUrl: './book-upsert.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgClass
  ],
  styleUrls: ['./book-upsert.component.css']
})
export class BookUpsertComponent implements OnInit {
  @Input() mode!: 'update' | 'create';
  bookForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private route: ActivatedRoute) {
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

  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
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
      // Handle form submission (e.g., send `formData` to API)
      formData.forEach((value, key) => {
        console.log( key,': ', value);
      })
    }
  }
}
