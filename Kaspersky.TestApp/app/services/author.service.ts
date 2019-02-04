import { Observable } from "rxjs/Rx";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Global } from "../global"
import { Injectable } from "@angular/core";
import { Author } from "../models/author";

/* Сервис для работы с авторами книг*/

@Injectable()
export class AuthorService {
    constructor(private http: Http) { }

    getAllData(): Observable<Author[]> {
        return this.http.get(Global.BASE_AUTHOR_ENDPOINT)
            .map((response: Response) => response.json())
            .catch((response: Response) => this.handleError(response));
    }

    getData(id: number): Observable<Author> {
        const params = { params: { id: id } };
        return this.http.get(Global.BASE_AUTHOR_ENDPOINT, params)
            .map((response: Response) => response.json())
            .catch((response: Response) => this.handleError(response));
    }

    add(fName: string, lName: string): Observable<Author> {
        var newAuthor = new Author(undefined, fName, lName);

		 let headers = new Headers({ 'Content-Type': "application/json; charset=utf-8" });
	    let options = new RequestOptions({ headers: headers });  
        
       return this.http.post(Global.BASE_AUTHOR_ENDPOINT, JSON.stringify(newAuthor), options)
            .map((response: Response) => {
                var newId = response.json();
                newAuthor.Id = newId;
                return newAuthor;
            })
            .catch((response: Response) => this.handleError(response));
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || "Server error");
    }

}
