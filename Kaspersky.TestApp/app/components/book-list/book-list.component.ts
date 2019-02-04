import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BookService } from "../../services/book.service"
import { Book } from "../../models/book"
import { CookieHelper } from "../../miscellaneous/CookieHelper"

/* Компонент. Форма списка книг */

declare var jquery: any;
declare var $: any;
class SortInfo { title: string; status: number; }

@Component({
    selector: "book-list",
    templateUrl: "./book-list.component.html",
    styleUrls: ["./book-list.component.css"]
})

export class BookListComponent implements OnInit {
    books: Book[];

    sortData: SortInfo[] = [
        { title: "Title", status: 0 }, { title: "PageCount", status: 0 }
    ];

    constructor(private bookService: BookService, private router: Router) { }

    ngOnInit() {
        this.bookService.getAllData().subscribe(bs => {
            this.books = bs;
            this.sortRestore();
        }, err => alert(err));
    }
   

    onDelete(book: Book) {
        this.bookService.delete(book).subscribe(b => {
            this.books.splice(this.books.indexOf(b), 1);
        }, err => { alert(err); });
    }

    onEdit(book: Book) {
	    this.router.navigate(["books", "edit", book.Id]);
    }

    addBook() {
	    this.router.navigate(["books", "add"]);
    }


    sortStatus(name: string) {
        var st = this.sortData.find(s => s.title == name);
        return !st ? 0 : st.status;
	 }

    sortClick(name: string) {
        var st = this.sortData.find(s => s.title == name);
        if (st) {
            st.status = st.status == 1 ? 2 : 1;
            this.sortData.filter(el => el.title != st.title).forEach(el => el.status = 0);
            this.sort(name);
        }
	 }

    sort(name: string) {
        var st = this.sortData.find(s => s.title == name);
        if (st) {
            if (st.title == "Title") {
                this.books.sort((a: any, b: any) => {
	                if (st.status == 2) { var t = a; a = b; b = t; }
	                return (a.Title.toLowerCase() > b.Title.toLowerCase()) ? 1 :
		                ((b.Title.toLowerCase() > a.Title.toLowerCase()) ? -1 : 0);
                });
            }
            if (st.title == "PageCount") {

                this.books.sort((a: any, b: any) => {
	                if (st.status == 2) { var t = a; a = b; b = t; }
	                return (a.PageCount > b.PageCount) ? 1 : ((b.PageCount > a.PageCount) ? -1 : 0);
                });
            }
            CookieHelper.setCookie("sortBy", st.title, 5);
            CookieHelper.setCookie("sortDirection", st.status, 5);
        }
    }
    sortRestore() {
        var sortParam = CookieHelper.getCookie("sortBy");
        var sortDirection = CookieHelper.getCookie("sortDirection");
        if (sortParam != "" && sortDirection != "") {
            this.sortData.forEach(el => el.status = el.title == sortParam ? parseInt(sortDirection) : 0);
            this.sort(sortParam);
        }
    }
}