"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var book_service_1 = require("../../services/book.service");
var CookieHelper_1 = require("../../miscellaneous/CookieHelper");
var sort_data = /** @class */ (function () {
    function sort_data() {
    }
    return sort_data;
}());
var BookListComponent = /** @class */ (function () {
    function BookListComponent(bookService, router) {
        this.bookService = bookService;
        this.router = router;
        this.sortData = [
            { title: "title", status: 0 }, { title: "pCount", status: 0 }
        ];
    }
    BookListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.bookService.GetAllData().subscribe(function (bs) {
            _this.books = bs;
            _this.SortRestore();
        }, function (err) { return alert(err); });
    };
    BookListComponent.prototype.OnDelete = function (book) {
        var _this = this;
        this.bookService.delete(book).subscribe(function (b) {
            _this.books.splice(_this.books.indexOf(b), 1);
        }, function (err) { alert(err); });
    };
    BookListComponent.prototype.OnEdit = function (book) {
        this.router.navigate(["books", "edit", book.id]);
    };
    BookListComponent.prototype.AddBook = function () {
        this.router.navigate(["books", "add"]);
    };
    BookListComponent.prototype.SortStatus = function (name) {
        var st = this.sortData.find(function (s) { return s.title == name; });
        return !st ? 0 : st.status;
    };
    BookListComponent.prototype.SortClick = function (name) {
        var st = this.sortData.find(function (s) { return s.title == name; });
        if (st) {
            st.status = st.status == 1 ? 2 : 1;
            this.sortData.filter(function (el) { return el.title != st.title; }).forEach(function (el) { return el.status = 0; });
            this.Sort(name);
        }
    };
    BookListComponent.prototype.Sort = function (name) {
        var st = this.sortData.find(function (s) { return s.title == name; });
        if (st) {
            if (st.title == 'title') {
                this.books.sort(function (a, b) {
                    if (st.status == 2) {
                        var t = a;
                        a = b;
                        b = t;
                    }
                    return (a.title.toLowerCase() > b.title.toLowerCase()) ? 1 :
                        ((b.title.toLowerCase() > a.title.toLowerCase()) ? -1 : 0);
                });
            }
            if (st.title == 'pCount') {
                this.books.sort(function (a, b) {
                    if (st.status == 2) {
                        var t = a;
                        a = b;
                        b = t;
                    }
                    return (a.pCount > b.pCount) ? 1 : ((b.pCount > a.pCount) ? -1 : 0);
                });
            }
            CookieHelper_1.CookieHelper.setCookie("sortby", st.title, 5);
            CookieHelper_1.CookieHelper.setCookie("sortdirection", st.status, 5);
        }
    };
    BookListComponent.prototype.SortRestore = function () {
        var sort_param = CookieHelper_1.CookieHelper.getCookie("sortby");
        var sort_direction = CookieHelper_1.CookieHelper.getCookie("sortdirection");
        if (sort_param != "" && sort_direction != "") {
            this.sortData.forEach(function (el) { return el.status = el.title == sort_param ? parseInt(sort_direction) : 0; });
            this.Sort(sort_param);
        }
    };
    BookListComponent = __decorate([
        core_1.Component({
            selector: 'book-list',
            templateUrl: './book-list.component.html',
            styleUrls: ['./book-list.component.css']
        }),
        __metadata("design:paramtypes", [book_service_1.BookService, router_1.Router])
    ], BookListComponent);
    return BookListComponent;
}());
exports.BookListComponent = BookListComponent;
//# sourceMappingURL=book-list.component.js.map