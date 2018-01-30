import { Observable, Subscriber } from "rxjs/Rx";
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Global } from '../global'

import { Injectable } from '@angular/core';
import { Author } from '../models/author';

@Injectable()
export class AuthorService {
    constructor(private _http: Http) { }

    GetAllData(): Observable<Author[]> {
        return this._http.get(Global.BASE_AUTHOR_ENDPOINT)
            .map((response: Response) => <any>response.json())
            .catch((response: Response) => this.handleError(response));
    }

    GetData(id: number): Observable<Author> {
        const params = { params: { id: id } };
        return this._http.get(Global.BASE_AUTHOR_ENDPOINT, params)
            .map((response: Response) => <any>response.json())
            .catch((response: Response) => this.handleError(response));
    }

    Add(fName: string, lName: string): Observable<Author> {
        var newAuthor = new Author(undefined, fName, lName);
        
        let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' })
        let options = new RequestOptions({ headers: headers });  
        
        return this._http.post(Global.BASE_AUTHOR_ENDPOINT, JSON.stringify(newAuthor), options)
            .map((response: Response) => {
                var newId = <any>response.json();
                newAuthor.id = newId;
                return newAuthor;
            })
            .catch((response: Response) => this.handleError(response));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(<any>error.json() || 'Server error');
    }


    /*
        //Для локальной версии

        GetAllData(): Observable<Author[]> {
            return Observable.create((observer: Subscriber<any>) => {
                observer.next(Global.FakeAuthorArray);
                observer.complete();
                console.log("+++");
            });
        }
        GetData(_id: number): Observable<Author> {
            return Observable.create((observer: Subscriber<any>) => {
                var cx = 0;
                observer.next(Global.FakeAuthorArray.find(x => x.id == _id));
                observer.complete();
            });
        }
        Add(fName: string, lName: string): Observable<Author> {
            return Observable.create((observer: Subscriber<any>) => {
                if (Global.FakeAuthorArray.find(x => x.FirstName.toUpperCase().trim() == fName.toUpperCase().trim()) &&
                    Global.FakeAuthorArray.find(x => x.LastName.toUpperCase().trim() == lName.toUpperCase().trim()))
                    observer.error("Такой автор уже есть!");
                else {
                    var newId = Global.FakeAuthorArray[Global.FakeAuthorArray.length - 1].id + 1;
                    var author = new Author(newId, fName, lName);
                    Global.FakeAuthorArray.push(author);
                    observer.next(author);
                    observer.complete();
                }
            });
        }
     */
}
