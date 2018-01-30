import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, Subscriber } from "rxjs/Rx";

import { Global } from '../global'

import { Author } from '../models/author';
import { Book } from '../models/book';

import { Injectable } from '@angular/core';

@Injectable()
export class BookService {
    
    constructor(private _http: Http) { }

    upload(img: File) : Observable<any> {
        var formData: FormData = new FormData();
        formData.append("image", img, img.name);

        return this._http.post(Global.BASE_IMGUPLOAD_ENDPOINT, formData)
            .map((response: Response) => <any>response.json())
            .catch((response: Response) => this.handleError(response));
    }

    GetAllData(): Observable<Book[]> {
        return this._http.get(Global.BASE_BOOK_ENDPOINT)
            .map((response: Response) => <any>response.json())
            .catch((response: Response) => this.handleError(response));
    }
    
    GetData(id: number): Observable<Book> {
        const params = { params: { id: id } };
        return this._http.get(Global.BASE_BOOK_ENDPOINT, params)
            .map((response: Response) => <any>response.json())
            .catch((response: Response) => this.handleError(response));
    }


    update(book: Book): Observable<Book> {
        let url = `${Global.BASE_BOOK_ENDPOINT}${book.id}`;

        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
        let options = new RequestOptions({ headers: headers });

        return this._http.put(url, JSON.stringify(book), options)
            .map((response: Response) => {
                return book;
            })
            .catch((response: Response) => this.handleError(response));
    }

    create(book: Book): Observable<Book> {
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
        let options = new RequestOptions({ headers: headers });

        return this._http.post(Global.BASE_BOOK_ENDPOINT, JSON.stringify(book), options)
                   .map((response: Response) => {
                        book.id = <any>response.json()
                        return book;
                    })
                   .catch((response: Response) => this.handleError(response));
    }



    delete(book: Book): Observable<Book> {
        let url = `${Global.BASE_BOOK_ENDPOINT}${book.id}`;

        return this._http.delete(url)
            .map((response: Response) => { return book; })
            .catch((response: Response) => this.handleError(response));        
    }
    

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(<any>error.json() || 'Server error');
    }

    /*
     // Для локальной версии

     GetAllData(): Observable<Book[]> {
            return Observable.create((observer: Subscriber<any>) => {
                observer.next(this.data);
                observer.complete();
            });
     }

     GetData(id: number): Observable<Book> {
        return Observable.create((observer: Subscriber<any>) => {
            observer.next(Global.FakeBookArray.find(x => x.id == id));
            observer.complete();
        });
     }
     create(book: Book): Observable<Book> {
        book.id = Global.FakeBookArray[Global.FakeBookArray.length - 1].id + 1;
        Global.FakeBookArray.push(book);
        return Observable.create((observer: Subscriber<any>) => {
            //observer.error("Error editing book!");
            observer.next(book);
            observer.complete();
        });
     }
     update(book: Book): Observable<Book> {
        let toUpdate = Global.FakeBookArray.find(x => x.id == book.id);
        toUpdate.title += toUpdate.title;
        Object.assign(toUpdate, book);
        return Observable.create((observer: Subscriber<any>) => {
            //observer.error("Error editing book!");
            observer.next(toUpdate);
            observer.complete();
        });
     }
     delete(book: Book): Observable<Book> {
        return Observable.create((observer: Subscriber<any>) => {
            observer.error("Error deleting book!");
            observer.next(book);
            observer.complete();
        });
     }
    */
}
