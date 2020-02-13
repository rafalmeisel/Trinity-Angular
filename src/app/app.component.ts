import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { element } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiService]
})
export class AppComponent {
  books = [{title: 'test'}];
  users = [{id: '-1', login: 'test', name: 'test', privileges: '3'}];
  selectedBook;
  selectedUser;
  login;

  emptyBook = {id: -1, title: '' , description: '', author: '', year: 0, amount: 0 };
  emptyUser = {id: -1, login: '' , name: '', privileges: 3};

  constructor(private api: ApiService) {
    this.getBooks();
    this.getUsers();
    this.selectedBook = this.emptyBook;
    this.selectedUser = this.emptyUser;
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

  getUsers = () => {
    this.api.getAllUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  loginUser = () => {
    for (var user of this.users){
      if(user.login == this.login){
        this.selectedUser.id = user.id;
        this.selectedUser.login = user.login;
        this.selectedUser.name = user.name;
        this.selectedUser.privileges = user.privileges;
      }
    }
  }

  logoutUser = () => {
    this.selectedUser = {id: -1, login: '' , name: '', privileges: ''};
  }
  
  createUser = () => {
    this.api.createUser(this.selectedUser).subscribe(
      data => {
        this.users.push(data);
        this.selectedBook = {id: -1, login: '' , name: '', privileges: ''};
      },
      error => {
        console.log(error);
      }
    );
  }

}