import {Component, Input, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgIf} from '@angular/common';
import {FileService} from '../../../admin/books/book-upsert/file.service';
import {Subscription} from 'rxjs';
import {ShowcaseBookCardModel} from '../../../models/books/showcase-book-card.model';

@Component({
  selector: 'app-showcase-book-card',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './showcase-book-card.component.html',
  styleUrl: './showcase-book-card.component.css'
})
export class ShowcaseBookCardComponent  implements OnInit {
  @Input() public bookCard!: ShowcaseBookCardModel;
  @Input() public isUpsert!: boolean;
  private fileSubscription!: Subscription;

  constructor(private fileService: FileService) {
  }

  ngOnInit(): void {
    if(this.isUpsert){
      this.fileSubscription = this.fileService.file$.subscribe((file) => {
        if (file) {
          // Создаем URL для изображения
          this.bookCard.coverUrl = URL.createObjectURL(file);
        } else {
        }
      });
    }
    }
}
