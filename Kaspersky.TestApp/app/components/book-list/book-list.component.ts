import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service'
import { Book } from '../../models/book'
import { Author } from '../../models/author'
import { Global } from '../../global'
import { CookieHelper } from '../../miscellaneous/CookieHelper'

declare var jquery: any;
declare var $: any;
class sort_data { title: string; status: number; }


@Component({
    selector: 'book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
    books: Book[];

    sortData: sort_data[] = [
        { title: "title", status: 0 }, { title: "pCount", status: 0 }
    ];

    constructor(private bookService: BookService, private router: Router) { }

    ngOnInit() {
        this.bookService.GetAllData().subscribe(bs => {
            this.books = bs;
            this.SortRestore();
        }, () => console.error("error"));
    }
   

    OnDelete(book: Book) {
        this.bookService.delete(book).subscribe(b => {
            this.books.splice(this.books.indexOf(b), 1);
        }, err => { alert(err); });
    }

    OnEdit(book: Book) {
        this.router.navigate(["books", "edit", book.id])
    }

    AddBook() {
        this.router.navigate(["books", "add"])
    }


    SortStatus(name: string) {
        var st = this.sortData.find(s => s.title == name);
        return !st ? 0 : st.status;
    }
    SortClick(name: string) {
        var st = this.sortData.find(s => s.title == name);
        if (st) {
            st.status = st.status == 1 ? 2 : 1;
            this.sortData.filter(el => el.title != st.title).forEach(el => el.status = 0);
            this.Sort(name);
        }
    }
    Sort(name: string) {
        var st = this.sortData.find(s => s.title == name);
        if (st) {
            if (st.title == 'title') {
                this.books.sort(function (a: any, b: any) {
                    if (st.status == 2) { var t = a; a = b; b = t; }
                    return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
                });
            }
            if (st.title == 'pCount') {

                this.books.sort(function (a: any, b: any) {
                    if (st.status == 2) { var t = a; a = b; b = t; }
                    return (a.pCount > b.pCount) ? 1 : ((b.pCount > a.pCount) ? -1 : 0);
                });
            }
            CookieHelper.setCookie("sortby", st.title, 5);
            CookieHelper.setCookie("sortdirection", st.status, 5);
        }
    }
    SortRestore() {
        var sort_param = CookieHelper.getCookie("sortby");
        var sort_direction = CookieHelper.getCookie("sortdirection");
        if (sort_param != "" && sort_direction != "") {
            this.sortData.forEach(el => el.status = el.title == sort_param ? parseInt(sort_direction) : 0);
            this.Sort(sort_param);
        }
    }
}