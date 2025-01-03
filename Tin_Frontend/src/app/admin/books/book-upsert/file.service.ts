import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private fileSubject = new BehaviorSubject<File | null>(null);

  file$ = this.fileSubject.asObservable();

  setFile(file: File): void {
    this.fileSubject.next(file);
  }

  getFile(): File | null {
    return this.fileSubject.value;
  }
}
