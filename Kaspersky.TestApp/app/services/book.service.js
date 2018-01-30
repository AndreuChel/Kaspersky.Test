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
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var global_1 = require("../global");
var core_1 = require("@angular/core");
var BookService = /** @class */ (function () {
    function BookService(_http) {
        this._http = _http;
    }
    BookService.prototype.upload = function (img) {
        var _this = this;
        var formData = new FormData();
        formData.append("image", img, img.name);
        return this._http.post(global_1.Global.BASE_IMGUPLOAD_ENDPOINT, formData)
            .map(function (response) { return response.json(); })
            .catch(function (response) { return _this.handleError(response); });
    };
    BookService.prototype.GetAllData = function () {
        var _this = this;
        return this._http.get(global_1.Global.BASE_BOOK_ENDPOINT)
            .map(function (response) { return response.json(); })
            .catch(function (response) { return _this.handleError(response); });
    };
    BookService.prototype.GetData = function (id) {
        var _this = this;
        var params = { params: { id: id } };
        return this._http.get(global_1.Global.BASE_BOOK_ENDPOINT, params)
            .map(function (response) { return response.json(); })
            .catch(function (response) { return _this.handleError(response); });
    };
    BookService.prototype.update = function (book) {
        var _this = this;
        var url = "" + global_1.Global.BASE_BOOK_ENDPOINT + book.id;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.put(url, JSON.stringify(book), options)
            .map(function (response) {
            return book;
        })
            .catch(function (response) { return _this.handleError(response); });
    };
    BookService.prototype.create = function (book) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http.post(global_1.Global.BASE_BOOK_ENDPOINT, JSON.stringify(book), options)
            .map(function (response) {
            book.id = response.json();
            return book;
        })
            .catch(function (response) { return _this.handleError(response); });
    };
    BookService.prototype.delete = function (book) {
        var _this = this;
        var url = "" + global_1.Global.BASE_BOOK_ENDPOINT + book.id;
        return this._http.delete(url)
            .map(function (response) { return book; })
            .catch(function (response) { return _this.handleError(response); });
    };
    BookService.prototype.handleError = function (error) {
        console.error(error);
        return Rx_1.Observable.throw(error.json() || 'Server error');
    };
    BookService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], BookService);
    return BookService;
}());
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map