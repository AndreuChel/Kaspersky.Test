import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Rx";
import { Global } from "../global"
import { Book } from "../models/book";
import { Injectable } from "@angular/core";

/* Сервис для работы с книгами*/

@Injectable()
export class BookService {
    
    constructor(private http: Http) { }

    upload(img: File) : Observable<any> {
        const formData = new FormData();
        formData.append("image", img, img.name);

        return this.http.post(Global.BASE_IMGUPLOAD_ENDPOINT, formData)
            .map((response: Response) => response.json())
            .catch((response: Response) => this.handleError(response));
    }

    getAllData(): Observable<Book[]> {
        return this.http.get(Global.BASE_BOOK_ENDPOINT)
            .map((response: Response) => response.json())
            .catch((response: Response) => this.handleError(response));
    }
    
    getData(id: number): Observable<Book> {
        const params = { params: { id: id } };
        return this.http.get(Global.BASE_BOOK_ENDPOINT, params)
            .map((response: Response) => response.json())
            .catch((response: Response) => this.handleError(response));
    }


    update(book: Book): Observable<Book> {
		 const url = `${Global.BASE_BOOK_ENDPOINT}${book.Id}`;
		 const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	    const options = new RequestOptions({ headers: headers });

       return this.http.put(url, JSON.stringify(book), options)
            .map(() => {return book;})
            .catch((response: Response) => this.handleError(response));
    }

    create(book: Book): Observable<Book> {
	    const headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
	    const options = new RequestOptions({ headers: headers });

       return this.http.post(Global.BASE_BOOK_ENDPOINT, JSON.stringify(book), options)
			  .map((response: Response) => {
				  book.Id = response.json();
		        return book;
			  })
	        .catch((response: Response) => this.handleError(response));
    }

    delete(book: Book): Observable<Book> {
	    const url = `${Global.BASE_BOOK_ENDPOINT}${book.Id}`;

	    return this.http.delete(url)
            .map(() => { return book; })
            .catch((response: Response) => this.handleError(response));
    }


	 private handleError(error: Response) {
	    console.error(JSON.stringify(error.json()));
		 return Observable.throw(error.json().ExceptionMessage || error.json() || "Server error");
    }

}
