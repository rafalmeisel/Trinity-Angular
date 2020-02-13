import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})
export class AppComponent {
  books = [{title: 'test'}];
  selectedBook;
  emptyBook = {id: -1, title: '' , description: '', author: '', year: 0, amount: 0 };

  constructor(private api: ApiService) {
    this.getBooks();
    this.selectedBook = this.emptyBook;
  }
  getBooks = () => {
    this.api.getAllBooks().subscribe(
      data => {
        this.books = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  editBook = (book) => {
    this.api.getOneBook(book.id).subscribe(
      data => {
        this.selectedBook = data;
      },
      error => {
        console.log(error);
      }
    );
  }
  updateBook = () => {
    this.api.updateBook(this.selectedBook).subscribe(
      data => {
        this.getBooks();
        this.selectedBook = {id: -1, title: '' , description: '', author: '', year: 0, amount: 0 };
      },
      error => {
        console.log(error);
      }
    );
  }
  createBook = () => {
    this.api.createBook(this.selectedBook).subscribe(
      data => {
        this.books.push(data);
        this.selectedBook = {id: -1, title: '' , description: '', author: '', year: 0, amount: 0 };
      },
      error => {
        console.log(error);
      }
    );
  }
  deleteBook = (book) => {
    this.api.deleteBook(book.id).subscribe(
      data => {
        this.getBooks();
      },
      error => {
        console.log(error);
      }
    );
  }
}