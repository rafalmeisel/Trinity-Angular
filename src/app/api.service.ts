import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseurl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any> {
    return this.http.get(this.baseurl + '/books/',
    {headers: this.httpHeaders});
  }
  getOneBook(id): Observable<any> {
    return this.http.get(this.baseurl + '/books/' + id + '/',
    {headers: this.httpHeaders});
  }
  updateBook(book): Observable<any> {
    const body = {title: book.title , description: book.description, author: book.author, year: book.year };
    return this.http.put(this.baseurl + '/books/' + book.id + '/', body,
    {headers: this.httpHeaders});
  }
  createBook(book): Observable<any> {
    const body = {title: book.title , description: book.description, author: book.author, year: book.year };
    return this.http.post(this.baseurl + '/books/', body,
    {headers: this.httpHeaders});
  }
  deleteBook(id): Observable<any> {
    return this.http.delete(this.baseurl + '/books/' + id + '/',
    {headers: this.httpHeaders});
  }
}